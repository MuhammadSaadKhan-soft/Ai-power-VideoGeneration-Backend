// routes/generate.js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Prompt generator for marketing videos
const createMarketingPrompt = ({ features, tone, audience, style }) => {
  return `
You are a creative video scriptwriter AI. Your task is to generate a 30-second marketing video script.

Product Features:
${features}

Tone of the video: ${tone}
Target Audience: ${audience}
Preferred Visual Style: ${style}

Respond strictly in this JSON format:
{
  "title": "string",
  "script": "string",
  "visualStyle": "string",
  "audioMood": "string",
  "sceneInstructions": ["string", "string", ...]
}
`;
};

// Prompt generator for real estate videos
const createRealEstatePrompt = ({ listing, style }) => {
  return `
You are an expert real estate video scriptwriter AI. Generate a 30-second narrated video tour of the following property.

Address: ${listing.address}
Price: ${listing.price}
Bedrooms: ${listing.bedrooms}
Bathrooms: ${listing.bathrooms}
Square Footage: ${listing.area}
Key Features: ${listing.features.join(', ')}
Visual Style: ${style}
Target Audience: High-end buyers
Tone: Luxury

Respond strictly in this JSON format:
{
  "title": "string",
  "script": "string",
  "visualStyle": "string",
  "audioMood": "string",
  "sceneInstructions": ["string", "string", ...]
}
`;
};

// Mock marketing video response
const mockMarketingResponse = {
  title: "Experience the Future of Fitness",
  script: "Are you ready to transform your workout? With our smart fitness band, every rep counts...",
  visualStyle: "High-energy, dynamic shots with bold colors and fast transitions.",
  audioMood: "Upbeat electronic background music with motivational voiceover.",
  sceneInstructions: [
    "Scene 1: Close-up of the fitness band powering on.",
    "Scene 2: A user jogging in a park, overlay of heart rate stats.",
    "Scene 3: Fast cuts of different workouts: lifting, cycling, yoga.",
    "Scene 4: Smiling user checking progress on mobile app.",
    "Scene 5: Tagline appears: 'Smarter Workouts. Better Results.'"
  ]
};

router.post('/', async (req, res) => {
  const { type, features, tone, audience, style } = req.body;

  try {
    if (type === 'marketing') {
      if (!features || !tone || !audience || !style) {
        return res.status(400).json({ error: 'Missing required fields for marketing video.' });
      }

      const prompt = createMarketingPrompt({ features, tone, audience, style });
      await new Promise(resolve => setTimeout(resolve, 1000));

      return res.json({
        videoScript: mockMarketingResponse,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        prompt
      });
    }

    if (type === 'realestate') {
      const predefinedListing = {
        address: "12012 Crest Ct, Beverly Hills, CA 90210",
        price: "$10,183,985",
        bedrooms: 5,
        bathrooms: 6.5,
        area: "6,100 sq ft",
        features: [
          "Luxury estate",
          "Three-car garage",
          "Landscaped grounds",
          "Elegant entrance with grand staircase",
          "Modern design",
          "Prime Beverly Hills location"
        ]
      };

      if (!style) {
        return res.status(400).json({ error: 'Missing style for real estate video.' });
      }

      const prompt = createRealEstatePrompt({ listing: predefinedListing, style });

      const script = {
        title: `Tour ${predefinedListing.address}`,
        script: `Step inside this stunning ${style.toLowerCase()} property located at ${predefinedListing.address}. Priced at ${predefinedListing.price}, it offers ${predefinedListing.bedrooms} bedrooms, ${predefinedListing.bathrooms} bathrooms, and spans ${predefinedListing.area}.`,
        visualStyle: style,
        audioMood: 'Calm and inviting background music',
        sceneInstructions: predefinedListing.features.map((f, i) => `Scene ${i + 1}: ${f}`)
      };

      await new Promise(resolve => setTimeout(resolve, 1000));

      return res.json({
        videoScript: script,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        prompt
      });
    }

    return res.status(400).json({ error: 'Unsupported video type.' });
  } catch (error) {
    console.error('Mock API error:', error);
    return res.status(500).json({ error: 'Something went wrong while generating video content.' });
  }
});

export default router;
