import { RoadmapType } from './RoadmapTypes';

export const Showcase: RoadmapType = {
  skillName: 'Showcase',
  description: 'Here you can see what you can expect while learning with us.',
  items: [
    {
      content: 'Pick the skill that you want to learn',
      description:
        'Do you already have something in mind? Or maybe you just want to learn something for the fun of it',
      quickTips: [
        'This is a quick tip, you will see them from time to time in your roadmaps, they will contain adive to make your learning expirience even better',
        'Choose from the list of matched skills or create a new one.',
      ],
      references: [
        {
          title: 'how to find your passion',

          type: 'video',
          url: 'https://www.youtube.com/watch?v=6pgaJb2Wwhs&ab_channel=ImprovementPill',
        },
        {
          title: 'How to Start a New Hobby (and make it stick)',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=iK3IFWoXIAw&ab_channel=Odysseas',
        },
      ],
    },
    {
      content:
        'Start your jurney of learning with the help of provided roadmap',
      description:
        "Remember, we can provide guidlines to help you, but you still have to put in the work, we can't put in the work for you! (even if We really wanted to)",
      quickTips: [
        'you can view reference sources of information that can help you in your jurney after clicking "View More" button',
      ],
      references: [
        {
          title: 'The organised learning - Sprouts',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=40meQNZl3KU&ab_channel=Sprouts',
        },
      ],
    },
    {
      content: 'Finish learning the skill and become a Mentor',
      description:
        'Share your expirence from learning the skill and help us make the roadmap better. Share some Tips, reference sources you found along the way or add additional steps to roadmap!',
      quickTips: null,
      references: null,
    },
  ],
};
