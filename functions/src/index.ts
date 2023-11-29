/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

const functions = require('firebase-functions');
const OpenAI = require('openai');

const openai = new OpenAI({apiKey: functions.config().openai.key});

exports.getSuggestions = functions.https.onCall(
  async (data: { list: any }, context: any) => {
    let list = data.list;
    const result = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            "I'm putting together a gift list and need suggestions on what to add. Give me at least two suggestions and up to ten in the form of a JSON array in an object called 'suggestions'. Please return the following JSON for each suggestion: {name: string, description: string}.",
        },
        {
          role: 'user',
          content: generateContentString(list),
        },
      ],
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    return result;

    function generateContentString(list: any): string {
      let content =
        'Here is my current list of items. Please give me at least two suggestions (preferably more) to add to the list. \n';
      if (!list.items) return content;
      for (let item of list.items) {
        content += `Item: ${item.name}; `;
        content += `URL: ${item.url}\n`;
      }
      return content;
    }
  }
);

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
