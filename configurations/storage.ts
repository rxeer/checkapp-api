import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucketName = 'check-app-47b07.appspot.com';

export default {
  storage,
  bucketName,
};
