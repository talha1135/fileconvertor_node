const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');
const {Storage} = require('@google-cloud/storage');
 const projectId = 'rugged-diagram-375519';
 async function authenticateImplicitWithAdc() {
   // This snippet demonstrates how to list buckets.
   // NOTE: Replace the client created below with the client required for your application.
   // Note that the credentials are not specified when constructing the client.
   // The client library finds your credentials using ADC.
   const storage = new Storage({
     projectId,
   });
   const [buckets] = await storage.getBuckets();
   console.log('Buckets:');
 
   for (const bucket of buckets) {
     console.log(`- ${bucket.name}`);
   }
 
   console.log('Listed all storage buckets.');
 }
 
 authenticateImplicitWithAdc();
// function(latest){
   this.ping=  async function downloadFile(latest) {
// URL of the image


const auth = new GoogleAuth({
   scopes: 'https://www.googleapis.com/auth/drive',
 });
 const service = google.drive({version: 'v3', auth});
 fileId = latest.id;
 try {
   const file = await service.files.get({
     fileId: fileId,
     alt: 'media',
   });
   console.log(file.status);
   return file.status;
 } catch (err) {
   // TODO(developer) - Handle error
   throw err;
 }
}