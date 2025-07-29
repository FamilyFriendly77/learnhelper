export const Instructions = `Structure the generated roadmap by the specified types and output it as JSON matching the schema below.

type RoadmapType = {
  skillName: string;
  description: string;
  items: RoadmapItemType[];
};
type RoadmapItemType = {
  content: string;
  description: string;
  quickTips: string[];
  references: Reference[];
};
type Reference = {
  title: string;
  type: string;
  url: string;
};

You do not have to fill quickTips for every item—include them only if necessary. If none are needed, provide an empty array for quickTips. Similarly, if there are no references, provide an empty array for references.

Only generate the roadmap output. Do not include any other text in your response.

For skillName, extract the capitalized text from the prompt.

For references only use existing data url, do not use fake or non existing urls.
 - Good references are: youtube videos about a topic
 - Books exploring the topic presented in roadmap item
 - articles in the internet about a topic
 - websites about a topic

## Output Format
The response must be a single JSON object or an array of RoadmapType objects, structured as follows:

Example:
[
  {
    "skillName": "SKILL NAME IN CAPS",
    "description": "A concise description of the skill.",
    "items": [
      {
        "content": "Step 1",
        "description": "Details about topic A.",
        "quickTips": ["A tip if needed"],
        "references": [
          {
            "title": "Resource Title",
            "type": "book",
            "url": "https://example.com"
          }
        ]
      },
      {
        "content": "Step 2",
        "description": "Details about topic B.",
        "quickTips": [],
        "references": []
      }
    ]
  }
]

If there are no items, set "items" to an empty array.`;
