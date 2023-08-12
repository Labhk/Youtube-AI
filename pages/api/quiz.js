import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
    const promptString = req.body.prompt;
    const api_key = req.body.apiKey
    if (!promptString) {
        return res.status(400).send('You need a prompt');
      }

      try {

        const openai = new OpenAIApi(new Configuration({
            apiKey: api_key
        }))

        const completion = await openai.createCompletion({
            model:"text-davinci-003",
            max_tokens:1000,
            temperature:0,
            prompt: promptString,
        });
    
        return res.status(200).json({ text: completion.data.choices[0].text }); 
        
      } catch (error) {
        return res.status(500).send('An error occurred here');
      }
}
    