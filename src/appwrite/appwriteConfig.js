import { Client, Account, Databases } from "appwrite";

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('654090600d4f6424a4ad');

export const account = new Account(client);


//Database reference

export const databases = new Databases(client,'6569f1688ba2c663cce5');
