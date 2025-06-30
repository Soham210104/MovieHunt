const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm,movie) => {
  //1.Using Appwrite SDK to check if the search term exist in the database
  try{
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', searchTerm)]);

    if(result.documents.length > 0){
      const doc = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        doc.$id,
        {
          // searchTerm: searchTerm,
          count: doc.count + 1, // 
          // lastSearched: new Date().toISOString() // Update the last searched time
        }
      );
    }
    else{
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()', // Use 'unique()' to generate a unique ID for the document
        {
          searchTerm,
          count: 1, // Initialize count to 1
          movie_id : movie.id,
          poster_url : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }
      )
    }
  }catch{

  }
  //2.If it exist, update the search count
  //3.If it does not exist, create a new document with the search term and count 1
}
