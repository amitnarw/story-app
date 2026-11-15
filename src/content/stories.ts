import type { Story } from './types';

const cover = (slug: string) => require(`../assets/stories/${slug}/cover.svg`) as any;
const storyImage = (slug: string, n: number) =>
  require(`../assets/stories/${slug}/img-${n}.svg`) as any;

/**
 * Loom launch library — six original literary stories.
 *
 * Copy rules: warm, plain-spoken, inclusive, non-explicit. No graphic
 * description. Every story assumes ongoing consent between its characters.
 */

export const stories: Story[] = [
  {
    slug: 'the-lamplighters-daughter',
    order: 1,
    title: "The Lamplighter's Daughter",
    author: 'Loom Editorial',
    kicker: 'A coastal town, a father’s nightly rounds, a daughter leaving',
    summary:
      'Every evening Elias climbs the cliff to light the harbour lamps. His daughter Mina has watched him do it all her life — until the morning she packs a bag and does not come back. A story about the light we leave behind and the light we carry with us.',
    minutes: 8,
    tags: ['family', 'coast', 'coming of age', 'light'],
    cover: cover('the-lamplighters-daughter'),
    coverAlt: 'A lighthouse at dusk, a single lamp glowing against a deep-blue sky',
    chapters: [
      {
        title: 'The Round',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Elias had lit the harbour lamps for forty-three years, and never once had he missed a night. Not in the gale of ’89, when the sea threw slate against the cliff face; not in the winter his wife died, when his hands shook so badly he struck the match three times before it caught. The town depended on the light, and the light depended on him.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'Mina had grown up beside that light. As a child she would sit on the lintel of the lamp-room window, her legs swinging over the drop to the rocks, watching her father wind the clockwork and trim the wick. “It is not the flame that matters,” he would say, soot on his cheek. “It is the fact that someone bothered to strike the match.”',
          },
          {
            kind: 'paragraph',
            text:
              'She was twenty-four when she left. Not in anger — there had been no shouting, no slammed door — but in the quiet way of people who have decided that staying would cost them more than going. She packed a canvas bag on a Tuesday morning, left it by the back door, and walked down to the bus while her father was still on the cliff, a hundred feet above the sea, striking his match.',
          },
        ],
      },
      {
        title: 'The Empty Room',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'The room she left behind was exactly as she had left it. The bed unmade, the blue wool jumper draped over the chair, a half-finished letter on the desk addressed to no one in particular. Elias did not touch anything. He climbed the cliff each night, lit the lamps, and came down to a house that smelled of lavender and absence.',
          },
          {
            kind: 'image',
            source: storyImage('the-lamplighters-daughter', 1),
            alt: 'A coastal path winding along cliffs at twilight, with a single figure walking toward a distant light',
            caption: 'The cliff path Mina took, in the direction of the bus.',
          },
          {
            kind: 'paragraph',
            text:
              'On the seventh night, a letter arrived. No return address, just her name in a hand he recognised instantly. It was short. She was well. She was in a city with too many lights, she wrote, and yet she missed the one he carried up the cliff every evening.',
          },
          {
            kind: 'paragraph',
            text:
              'Elias read it three times. Then he went to the window, looked out across the dark water, and lit another match. The harbour lamp bloomed, gold against the black, and for the first time in forty-three years he wondered if someone, somewhere, was sailing toward it.',
          },
        ],
      },
    ],
  },
  {
    slug: 'a-room-with-yellow-curtains',
    order: 2,
    title: 'A Room with Yellow Curtains',
    author: 'Loom Editorial',
    kicker: 'A woman returns to the house she grew up in',
    summary:
      'Clara inherits her grandmother’s cottage and finds it exactly as she left it twenty years ago — yellow curtains, a crack in the ceiling, and a drawer full of letters she never sent. Returning is not the same as belonging.',
    minutes: 7,
    tags: ['home', 'memory', 'inheritance', 'quiet'],
    cover: cover('a-room-with-yellow-curtains'),
    coverAlt: 'Yellow curtains in a sunlit window, with dust motes dancing in the light',
    chapters: [
      {
        title: 'The Key',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'The key was cold in Clara’s palm, brass worn soft at the edges from decades of use. She had not held it since she was eighteen, since the day she drove away from this cottage with the windows down and a cassette tape humming something she could no longer name. Twenty years. The cottage had been waiting the whole time.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'Her grandmother had died three weeks earlier. The solicitor’s letter had been polite, efficient, devoid of feeling. The house, the garden, the yellow curtains — all now Clara’s. She had come back for the weekend, meaning to clear it out, lock the door, and drive away again. She had not meant to stay long enough to remember anything.',
          },
          {
            kind: 'paragraph',
            text:
              'The lock turned with a sound like a sigh. She stepped inside, and the smell hit her first — lavender and beeswax, the faintest trace of pipe tobacco, the particular must of a house closed up for winter. Nothing had moved. The teacup still sat on the draining board. The wool blanket was folded over the back of the armchair exactly as her grandmother had left it.',
          },
        ],
      },
      {
        title: 'The Drawer',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'The bedroom was unchanged. Yellow curtains, faded now to the colour of old butter, filtered the afternoon light into stripes across the floorboards. A crack in the ceiling ran from the centre toward the eaves, a thin lightning bolt her grandmother had promised to fix “when the weather turned.” It never had.',
          },
          {
            kind: 'image',
            source: storyImage('a-room-with-yellow-curtains', 1),
            alt: 'An old wooden desk drawer pulled open, revealing letters tied with ribbon',
            caption: 'The drawer Clara had not opened since she was a girl.',
          },
          {
            kind: 'paragraph',
            text:
              'She opened the bedside drawer. Inside, tied with a faded blue ribbon, were her own letters. Twelve of them, addressed to boys and girls and one teacher, written between the ages of fourteen and seventeen, never posted, never shown to anyone. She had forgotten they existed. She had forgotten that she once wrote so freely.',
          },
          {
            kind: 'paragraph',
            text:
              'Clara sat on the edge of the bed and read the first one. Then the second. By the third she was crying, not because the words were painful, but because they were hers, and she had lost the person who wrote them. The cottage was not hers, not really. It belonged to the girl who wrote those letters, and that girl was gone.',
          },
          {
            kind: 'paragraph',
            text:
              'She tied the ribbon back, placed the letters in the drawer, and closed it. Then she opened the yellow curtains all the way, let the light in, and sat in the armchair to wait for the evening. For the first time in twenty years, she did not feel like leaving.',
          },
        ],
      },
    ],
  },
  {
    slug: 'the-last-train-to-somewhere',
    order: 3,
    title: 'The Last Train to Somewhere',
    author: 'Loom Editorial',
    kicker: 'Two strangers share a compartment through the night',
    summary:
      'On the final train of the season, Arthur and Nora find themselves alone in a first-class compartment. They do not know where the train is going, only that neither of them wants to be the first to get off. A story about conversations that begin because there is nowhere else to go.',
    minutes: 9,
    tags: ['travel', 'strangers', 'conversation', 'night'],
    cover: cover('the-last-train-to-somewhere'),
    coverAlt: 'A train window at night, streaks of light passing by in the dark',
    chapters: [
      {
        title: 'The Compartment',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'The train did not appear on any timetable Arthur could find. It departed at twenty minutes past eleven from a platform that had been disused since the seventies, and the ticket the conductor handed him was stamped with a destination he could not read: Somewhere, it said, or possibly Nowhere. The ink had smudged in the rain.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'The compartment was first-class, velvet and mahogany, and entirely empty except for Nora, who was already asleep against the window when Arthur slid the door open. She woke as the train lurched forward, her book slipping from her lap. “Sorry,” she said, and he said, “No, sorry,” and they both smiled at the absurdity of apologising to a stranger at half-past eleven on a train that did not exist.',
          },
          {
            kind: 'paragraph',
            text:
              'Outside, the darkness was absolute. No stations, no signals, no flicker of town lights — just the occasional flash of moon on water that might have been a lake or might have been the sea. The train did not stop. It only moved, steadily, into the dark.',
          },
        ],
      },
      {
        title: 'The Conversation',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'They talked about everything and nothing. Nora was a translator who had spent three years in Lisbon translating poems she could not speak aloud. Arthur repaired clocks in a shop above a chemist’s, and he believed that every broken mechanism could be fixed if you were patient enough to find the right gear. They found they liked the sound of each other’s voices, which is the rarest thing there is.',
            dropCap: false,
          },
          {
            kind: 'image',
            source: storyImage('the-last-train-to-somewhere', 1),
            alt: 'Two people sitting opposite each other in a train compartment, silhouetted against a window',
            caption: 'Arthur and Nora, discovering that the night was long enough for a lifetime of words.',
          },
          {
            kind: 'paragraph',
            text:
              'They did not exchange names until after midnight. They did not touch until nearly two. They did not speak of where they were going, or where they had come from, because those were questions with answers neither of them wanted to give. Instead they spoke of small things: the best way to brew tea, the name of the constellation Orion, the sound rain makes on a tin roof.',
          },
          {
            kind: 'paragraph',
            text:
              'At some point in the hours before dawn, Arthur realised he did not want the train to stop. Not because he feared where it was going, but because he feared where it would leave them — back on platforms, back in towns, back into lives that did not include this compartment, this darkness, this voice across the table.',
          },
          {
            kind: 'paragraph',
            text:
              'The first light of morning came grey through the window. The train slowed. A platform appeared, faint and unfamiliar, and the conductor knocked on the door. “Last stop,” he said. Nora looked at Arthur. Arthur looked at Nora. Neither of them moved.',
          },
        ],
      },
    ],
  },
  {
    slug: 'what-the-orchard-kept',
    order: 4,
    title: 'What the Orchard Kept',
    author: 'Loom Editorial',
    kicker: 'Siblings sell the family farm and find what was buried there',
    summary:
      'After their parents die, Leo and Ruby return to the orchard to prepare it for sale. Among the old apple trees they find a tin box their mother buried forty years ago, and the secret inside changes what they thought they knew about her. A story about the things we inherit, and the things we choose to keep.',
    minutes: 8,
    tags: ['family', 'farm', 'siblings', 'secrets'],
    cover: cover('what-the-orchard-kept'),
    coverAlt: 'An apple orchard in autumn, golden leaves falling, sunlight through branches',
    chapters: [
      {
        title: 'The Trees',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'The orchard had not been pruned in three years. Branches crossed and scraped against each other, apples fell where they stood and rotted into the grass, and the fence along the north field had sagged to the point where the sheep could walk through it if they chose. Leo and Ruby stood at the gate and looked at what their parents had left them.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'Their mother had died in the spring. Their father had followed her six months later, not from any illness Leo could name, but from the quiet kind of grief that simply stops a heart from beating. The farm was now theirs, with the mortgage paid and the taxes current and a real estate agent waiting in town to list it by the end of the week.',
          },
          {
            kind: 'paragraph',
            text:
              'They spent two days clearing the house. Boxes of books, photo albums, the china cabinet with its single chipped teacup. They found nothing surprising — until Ruby, digging in the garden shed for a trowel, struck something metal beneath a loose floorboard.',
          },
        ],
      },
      {
        title: 'The Box',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'It was a tin biscuit box, the kind that once held shortbread, its paint rubbed away at the corners. Inside, wrapped in oilcloth, were three things: a ring with a small sapphire, a letter addressed to “My love,” and a photograph of a woman Leo did not recognise — his mother, young, standing in front of a building that was not their farmhouse.',
            dropCap: false,
          },
          {
            kind: 'image',
            source: storyImage('what-the-orchard-kept', 1),
            alt: 'A rusted tin box on old wood, with a letter and a photograph partially visible',
            caption: 'What their mother kept, and never told them about.',
          },
          {
            kind: 'paragraph',
            text:
              'The letter was not to their father. It began, My love, if you are reading this then I have gone, and explained nothing and everything. Her mother had loved someone else, once, before the farm and the children and the long years of apple blossoms. She had chosen the orchard, and stayed, and kept the ring in a tin box beneath the shed floor for forty years.',
          },
          {
            kind: 'paragraph',
            text:
              'Ruby held the sapphire ring between her fingers, turning it toward the light. “Do you think she regretted it?” she asked. Leo looked at the photograph — his mother smiling, unafraid — and shook his head. “I think she kept it,” he said, “so she would remember that choosing one thing does not mean forgetting another.”',
          },
          {
            kind: 'paragraph',
            text:
              'They did not sell the farm that week. They pruned the north field instead. They planted new saplings where the old trees had died. And Leo put the ring back in the tin box, not beneath the floorboards this time, but on the mantelpiece where anyone could see it, so the orchard would remember what it had kept, and what it had let go.',
          },
        ],
      },
    ],
  },
  {
    slug: 'small-hours',
    order: 5,
    title: 'Small Hours',
    author: 'Loom Editorial',
    kicker: 'A night-shift baker and the insomniac who keeps buying the last loaf',
    summary:
      'Mira bakes through the night, pulling loaves from the oven while the city sleeps. Elias comes every night at three for the last sourdough, and they exchange words across the counter until dawn. A love story told in flour, crust, and the hours between midnight and morning.',
    minutes: 7,
    tags: ['romance', 'city', 'night', 'food'],
    cover: cover('small-hours'),
    coverAlt: 'Fresh bread on a wooden counter in a bakery at dawn, warm light spilling onto the street',
    chapters: [
      {
        title: 'The Oven',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Mira loved the small hours best. Not the midnight of parties and promises, but the three-in-the-morrow quiet, when the city had exhaled and the streets belonged to streetlights and delivery vans and her. The oven roared to life at eleven, and by midnight the kitchen was warm, flour-dusted, and hers alone.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'She had taken over the bakery from its previous owner five years earlier, inheriting the sourdough starter, the wooden peel, and the key to the back door. She baked sourdough and rye, baguettes and brioche, and she baked them through the night so that by morning the city could wake to the smell of crust and yeast.',
          },
          {
            kind: 'paragraph',
            text:
              'The front door unlocked itself at three, on a timer Mira had set long ago. No one ever came at three. Until Elias.',
          },
        ],
      },
      {
        title: 'The Last Loaf',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'He appeared on a Tuesday, rain slicking his coat, holding a notebook and looking as though he had not slept in days. “The last sourdough,” he said, and Mira reached under the counter, pulled out the final loaf still warm from the oven, and wrapped it in brown paper.',
            dropCap: false,
          },
          {
            kind: 'image',
            source: storyImage('small-hours', 1),
            alt: 'A baker handing a loaf of bread to a customer across a wooden counter at dawn',
            caption: 'Three in the morning, and the last loaf of the night.',
          },
          {
            kind: 'paragraph',
            text:
              'He came back on Wednesday. And Thursday. And every night after that, always at three, always for the last loaf. They fell into the easy rhythm of people who see each other only in the dark — words across a counter, flour on his fingers, steam rising from his coffee as he waited.',
          },
          {
            kind: 'paragraph',
            text:
              'They never exchanged numbers. They never met in daylight. They had the hours between midnight and morning, and that was enough. One night Elias brought a notebook filled with poems he had written about bread, and Mira brought him a loaf still too hot to touch, and they sat on the bakery steps watching the sky turn grey.',
          },
          {
            kind: 'paragraph',
            text:
              'The oven cooled. The city woke. And somewhere between the last loaf and the first light, they decided that the small hours were not a place to pass through, but a place to stay — at least until dawn.',
          },
        ],
      },
    ],
  },
  {
    slug: 'the-cartographer-of-rain',
    order: 6,
    title: 'The Cartographer of Rain',
    author: 'Loom Editorial',
    kicker: 'A mapmaker who charts storms that have not happened yet',
    summary:
      'Silas draws maps of storms before they arrive, marking cloud formations and wind directions that exist only in his imagination. When a real storm comes to his town, he discovers that the future is not something you can chart — only something you can live through, together.',
    minutes: 8,
    tags: ['weather', 'maps', 'future', 'community'],
    cover: cover('the-cartographer-of-rain'),
    coverAlt: 'An old map spread on a table, with storm clouds painted in ink at its edges',
    chapters: [
      {
        title: 'The Maps',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Silas drew storms that had not happened yet. In his attic studio, above the town’s only bookshop, he spread vellum across his desk and painted cloud formations that did not exist, wind directions that had not blown, rain patterns that no one had seen. He called himself a cartographer of rain, and the town humoured him, the way towns humour people who keep to themselves and do no harm.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'His maps were beautiful. Swirls of indigo and slate, arrows of wind curling like calligraphy, coastlines sketched in careful ink. He sold them at the market on Saturdays, and people bought them not because they believed in storms to come, but because the maps were lovely to look at. Silas did not mind why they bought them. He only wanted them drawn.',
          },
          {
            kind: 'paragraph',
            text:
              'He had never been wrong, and he had never been right. A map of a storm is only a guess until the sky agrees with it. Silas had drawn dozens, and not one had ever matched the weather that actually came.',
          },
        ],
      },
      {
        title: 'The Storm',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'On the third Thursday of October, the barometer dropped. The air went still. The birds stopped singing. Silas looked at his latest map — a slow spiral of cloud over the valley, rain moving east to west — and for the first time, the sky matched his ink exactly.',
            dropCap: false,
          },
          {
            kind: 'image',
            source: storyImage('the-cartographer-of-rain', 1),
            alt: 'Storm clouds gathering over a town, seen from an attic window',
            caption: 'The storm Silas had drawn, now arriving for real.',
          },
          {
            kind: 'paragraph',
            text:
              'The rain began at four in the afternoon and did not stop. The river rose. The road to the valley flooded. The town gathered in the school hall, sandbags stacked at the doors, and Silas went with them, his maps rolled under his arm like a shield.',
          },
          {
            kind: 'paragraph',
            text:
              'He expected to be afraid. Instead he found himself useful. He knew which way the water would run, which basement would fill first, which bridge would hold and which would not — not because of his maps, but because he had spent years watching the sky, and watching teaches you more than drawing ever could.',
          },
          {
            kind: 'paragraph',
            text:
              'When the rain stopped on Sunday morning, the town was wet and tired and whole. Silas climbed to his attic, unrolled his map of the storm that had come, and laid it beside the sky outside. They did not match. They never would. He drew a new map anyway — not of what was coming, but of what had been, and of the people who had stood together beneath the rain.',
          },
        ],
      },
    ],
  },
];
