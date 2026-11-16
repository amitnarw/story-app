import type { StoryCopy } from '../types';

/**
 * English prose for the launch library — the original text, unchanged.
 * Image blocks carry alt/caption only; artwork merges in from the manifest.
 */
export const enCopy: StoryCopy[] = [
  {
    slug: 'the-lamplighters-daughter',
    title: "The Lamplighter's Daughter",
    author: 'The Editors',
    kicker: 'A coastal town, a father’s nightly rounds, a daughter leaving',
    summary:
      'Every evening Elias climbs the cliff to light the harbour lamps. His daughter Mina has watched him do it all her life — until the morning she packs a bag and does not come back. A story about the light we leave behind and the light we carry with us.',
    tags: ['family', 'coast', 'coming of age', 'light'],
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
    title: 'A Room with Yellow Curtains',
    author: 'The Editors',
    kicker: 'A woman returns to the house she grew up in',
    summary:
      'Clara inherits her grandmother’s cottage and finds it exactly as she left it twenty years ago — yellow curtains, a crack in the ceiling, and a drawer full of letters she never sent. Returning is not the same as belonging.',
    tags: ['home', 'memory', 'inheritance', 'quiet'],
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
    title: 'The Last Train to Somewhere',
    author: 'The Editors',
    kicker: 'Two strangers share a compartment through the night',
    summary:
      'On the final train of the season, Arthur and Nora find themselves alone in a first-class compartment. They do not know where the train is going, only that neither of them wants to be the first to get off. A story about conversations that begin because there is nowhere else to go.',
    tags: ['travel', 'strangers', 'conversation', 'night'],
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
          },
          {
            kind: 'image',
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
    title: 'What the Orchard Kept',
    author: 'The Editors',
    kicker: 'Siblings sell the family farm and find what was buried there',
    summary:
      'After their parents die, Leo and Ruby return to the orchard to prepare it for sale. Among the old apple trees they find a tin box their mother buried forty years ago, and the secret inside changes what they thought they knew about her. A story about the things we inherit, and the things we choose to keep.',
    tags: ['family', 'farm', 'siblings', 'secrets'],
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
          },
          {
            kind: 'image',
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
    title: 'Small Hours',
    author: 'The Editors',
    kicker: 'A night-shift baker and the insomniac who keeps buying the last loaf',
    summary:
      'Mira bakes through the night, pulling loaves from the oven while the city sleeps. Elias comes every night at three for the last sourdough, and they exchange words across the counter until dawn. A love story told in flour, crust, and the hours between midnight and morning.',
    tags: ['romance', 'city', 'night', 'food'],
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
          },
          {
            kind: 'image',
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
    title: 'The Cartographer of Rain',
    author: 'The Editors',
    kicker: 'A mapmaker who charts storms that have not happened yet',
    summary:
      'Silas draws maps of storms before they arrive, marking cloud formations and wind directions that exist only in his imagination. When a real storm comes to his town, he discovers that the future is not something you can chart — only something you can live through, together.',
    tags: ['weather', 'maps', 'future', 'community'],
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
          },
          {
            kind: 'image',
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
  {
    slug: 'the-guest-house-at-midnight',
    title: 'The Guest House at Midnight',
    author: 'The Editors',
    kicker: 'A snowstorm, a remote mountain inn, and a stranger who stays the night',
    summary:
      'Eliza runs a guest house high in the hills, alone since her husband left. On the coldest night of the year, a man arrives with frost on his coat and no reservation. One room, one fire, one long night — and the quiet realisation that some doors open only in the dark.',
    tags: ['romance', 'mountains', 'winter', 'intimacy'],
    coverAlt: 'A stone guest house in snow, a single window lit from within',
    contentNote: 'Adult themes, sensuality, intimacy',
    chapters: [
      {
        title: 'The Stranger at the Door',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Eliza had not had a guest in three months. Not since the first real snow locked the pass, not since the road below the ridge turned to ice, not since Daniel left and took the warmth with him. The guest house sat at twelve thousand feet, a stone box with six rooms and a fireplace that had burned continuously for forty winters — until this one, when Eliza let it go out, and did not relight it.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'The knock came at nine, when the sky was already the colour of a bruise and the wind was driving snow horizontally against the windows. Eliza was in the kitchen, pouring tea she would drink alone, when she heard it — three sharp raps against the heavy oak door, loud enough to carry over the storm.',
          },
          {
            kind: 'image',
            alt: 'Snow-covered mountains at night, a single lit window in a stone building',
            caption: 'The guest house, holding its breath against the storm.',
          },
          {
            kind: 'paragraph',
            text:
              'She opened the door to a man in a wool coat dusted with frost, his cheeks red from cold, a leather bag slung across his chest. “I saw your light from the switchback,” he said, his breath a cloud in the doorway. “Is there a room? I cannot go back down tonight.”',
          },
          {
            kind: 'paragraph',
            text:
              'Eliza should have said no. She should have pointed him to the village ten kilometres below, or told him the place was closed for the season. Instead she stepped aside. “There is one room,” she said. “The heating works. The rest is up to you.”',
          },
          {
            kind: 'paragraph',
            text:
              'His name was Elias, and he was a photographer, or so he said. He carried no camera, only the bag, and when he took off his boots by the fire, Eliza saw that his socks were darned in three places. He warmed his hands around the mug she handed him, and for a long time neither of them spoke. The storm had taken the world outside, and the only sound was the fire and the wind against the glass.',
          },
        ],
      },
      {
        title: 'The Long Night',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Dinner was soup from a tin, bread, and the last of Eliza’s wine. They ate at the kitchen table, the lamplight throwing their shadows long against the stone wall. Elias asked about the guest house, and Eliza told him — her husband had built it, her husband had left it, she had stayed because the mountains were easier than the city. Elias told her about roads he had driven, towns he had passed through, people he had loved briefly and left behind.',
          },
          {
            kind: 'image',
            alt: 'Two people sitting by a fireplace, shadows on a stone wall',
            caption: 'One fire, two strangers, the hours between dinner and sleep.',
          },
          {
            kind: 'paragraph',
            text:
              'The wine made Eliza talk more than she had in months. She told Elias about the winter her husband left, about the way she had learned to fix the boiler herself, about the loneliness that was not sadness but simply space — empty rooms, empty chair, empty bed. Elias listened without offering advice, which was rarer than she expected.',
          },
          {
            kind: 'paragraph',
            text:
              'When the fire burned down to embers, Elias added a log and the flames climbed again. They sat closer than before. Eliza could smell him — wool, snow, something like cedar smoke. He reached across the table and took her hand, not asking, just doing, and she did not pull away. The storm rattled the windows, but the guest house held, thick stone against the dark.',
          },
          {
            kind: 'paragraph',
            text:
              'They did not go to their separate rooms that night. Not immediately. They sat by the fire until the wine was gone and the embers were low, talking in voices that grew quieter as the hours passed. When Eliza finally led Elias to the spare room, she paused at the door. He turned to her, his face in shadow, and asked if she was coming back. Eliza looked at him — really looked — and said yes.',
          },
        ],
      },
    ],
  },
  {
    slug: 'a-season-in-the-hills',
    title: 'A Season in the Hills',
    author: 'The Editors',
    kicker: 'Apple blossoms, harvest crates, and a romance that ripens with the season',
    summary:
      'Maya comes to the hills for apple season, looking for work and nothing more. Rohan runs the orchard with quiet competence and tired hands. They work side by side through blossom and harvest, and discover that some seasons last longer than they should.',
    tags: ['romance', 'hills', 'orchard', 'season'],
    coverAlt: 'Apple trees in bloom, two people working among the rows',
    contentNote: 'Adult themes, sensuality',
    chapters: [
      {
        title: 'The Orchard',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Maya arrived on a Tuesday in March, when the apple trees were still bare but the air carried the promise of blossom. She had come from the city with a backpack, two thousand rupees, and no particular plan beyond finding work where the air was cold and the silence was real. The orchard belonged to Rohan’s family, had for three generations, and Rohan was the one who met her at the gate.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'He was younger than she expected, his hands already cracked from pruning shears, his eyes the colour of the hills after rain. “You’re here for the season,” he said, not a question. “We start pruning tomorrow. Be here at six.”',
          },
          {
            kind: 'image',
            alt: 'Apple orchard in early spring, rows of bare trees against a misty hillside',
            caption: 'The orchard waits for blossom, and for the season to begin.',
          },
          {
            kind: 'paragraph',
            text:
              'The work was harder than Maya had imagined. Pruning meant climbing ladders in the cold, cutting away dead wood so the tree could breathe. Her arms ached by noon, her back by evening. Rohan showed her where to cut, how to shape the tree, which branches to sacrifice. He was patient, or at least he pretended to be.',
          },
          {
            kind: 'paragraph',
            text:
              'By the first week of April, the orchard was pink. Blossom covered every branch, and the air smelled of apples and earth. Maya and Rohan worked side by side, she on one side of a row, he on the other, passing ladders and crates between them. They did not talk much at first — the work demanded their breath — but the silence became comfortable, then familiar.',
          },
          {
            kind: 'paragraph',
            text:
              'One evening, after the last crate was loaded, Rohan offered Maya tea at the farmhouse kitchen. They sat at the wooden table, steam rising between them, and for the first time they talked about something other than trees. Rohan’s father had died two years before, and the orchard was his now, with all the weight that implied. Maya told him about the city, about the job she had quit, about the person she had left behind.',
          },
        ],
      },
      {
        title: 'Harvest',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'September meant harvest, and harvest meant everyone working from dawn to dark. The apples came fast — Gala, then Fuji, then the late Red Delicious — and the orchard hummed with the sound of picking, sorting, packing. Maya and Rohan moved through the rows together now, their rhythms matching without discussion.',
          },
          {
            kind: 'image',
            alt: 'Crates of red apples, two people working in an orchard at golden hour',
            caption: 'Harvest season, and the hours grow shorter.',
          },
          {
            kind: 'paragraph',
            text:
              'It was in October, on a morning heavy with mist, that Rohan found Maya alone among the trees. She was sitting on a ladder, eating an apple she had just picked, juice running down her wrist. He stood below and looked up at her, and for a moment neither of them spoke. Then he said, “You’re going back to the city when this ends, aren’t you?”',
          },
          {
            kind: 'paragraph',
            text:
              'Maya did not answer immediately. She had not decided. The season had stretched her in ways she had not expected — the cold mornings, the physical work, the quiet of the hills, and Rohan, who was always there, always steady, always looking at her as if she mattered. “I don’t know,” she said finally. “Maybe.”',
          },
          {
            kind: 'paragraph',
            text:
              'Rohan climbed the ladder to sit beside her, close enough that their shoulders touched. The apple orchard spread below them, rows of trees heavy with fruit, the hills rolling away into the distance. He took her hand, his calloused palm against hers, and did not let go. “Stay,” he said. “Just for a little longer.”',
          },
          {
            kind: 'paragraph',
            text:
              'The last crate was packed on a Saturday in late October. The trees were bare again, the ground carpeted with fallen leaves. Maya stood at the gate with her backpack, the same one she had arrived with, but everything inside her was different. Rohan walked with her to the road, and when they reached the turn where the city bus would come, he stopped. “Write to me,” he said. “Tell me if the city is kind to you.”',
          },
          {
            kind: 'paragraph',
            text:
              'Maya looked at him — the orchard in his hands, the hills in his eyes, the life he had built one tree at a time. She reached up and touched his cheek, rough with stubble, warm under her fingers. “I will,” she said. And she meant it.',
          },
        ],
      },
    ],
  },
  {
    slug: 'the-photographers-wife',
    title: "The Photographer's Wife",
    author: 'The Editors',
    kicker: 'A famous photographer, his wife, and the hidden collection that changes everything',
    summary:
      'Clara has been Vincent’s wife for ten years, his muse, his assistant, his quiet support. When she discovers a locked cabinet full of intimate photographs he never showed her, she must decide whether art justifies the gaze — and whether her marriage can survive the truth.',
    tags: ['drama', 'art', 'marriage', 'desire'],
    coverAlt: 'A camera on a wooden table, a half-open drawer revealing photographs',
    contentNote: 'Adult themes, sensuality, the gaze',
    chapters: [
      {
        title: 'The Collection',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Clara had known Vincent for ten years, and she thought she knew everything about him. She knew how he took his coffee (black, no sugar), how he folded his shirts (sleeves first, then body), how he photographed (early morning light, always, never flash). She was his wife, his muse, his assistant, the woman who stood behind the camera so he could see through it.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'The studio was at the back of their house, a room with north-facing windows and white walls that reflected the light perfectly. Vincent worked there most days, emerging for meals, for sleep, for Clara. She had never been curious about what happened behind the locked cabinet in the corner — until the day she found the key in his coat pocket.',
          },
          {
            kind: 'image',
            alt: 'A wooden cabinet with a key in the lock, camera equipment in the background',
            caption: 'The cabinet Vincent kept locked, the photographs Clara was not meant to see.',
          },
          {
            kind: 'paragraph',
            text:
              'The cabinet opened to reveal drawers of prints, hundreds of them, all women, all nude or nearly so. Some were models Clara had met at exhibitions, smiling women who had posed for Vincent’s camera. Others were strangers — faces she did not recognize, bodies she had never seen, captured in moments of intimacy she had not known existed.',
          },
          {
            kind: 'paragraph',
            text:
              'Clara sat on the studio floor and looked through them all. The photographs were beautiful — Vincent had an eye for light, for the curve of a shoulder, for the way shadow falls across a thigh. But they were also intimate in a way that made Clara’s stomach turn. These were not just photographs. They were moments Vincent had shared with other women, moments he had never mentioned, moments he had kept locked away.',
          },
          {
            kind: 'paragraph',
            text:
              'She found one of herself, taken without her knowledge, sleeping on the couch in the studio, her mouth open, her body relaxed. She had not known he was there. She had not known he was watching. The discovery felt like a violation, and yet she could not look away.',
          },
        ],
      },
      {
        title: 'The Darkroom',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Vincent came home at seven, as he always did, smelling of developer and darkroom chemicals. Clara did not confront him immediately. She put the prints back, locked the cabinet, and waited. When Vincent entered the living room, Clara was sitting on the sofa, a glass of wine in her hand, the key on the table between them.',
          },
          {
            kind: 'image',
            alt: 'A darkroom with red safelight, photographic trays, and hanging prints',
            caption: 'The darkroom, where images are revealed and secrets are kept.',
          },
          {
            kind: 'paragraph',
            text:
              '“You found them,” Vincent said. Not a question, not a denial. He poured himself a drink and sat in the armchair, not looking at her. “Clara, I —”',
          },
          {
            kind: 'paragraph',
            text:
              '“Who are they?” Clara asked. Her voice was steady, which surprised her. She had expected to scream, to cry, to throw something. Instead she felt calm, as if the photographs had given her a language she had never had before.',
          },
          {
            kind: 'paragraph',
            text:
              '“Models. Friends. Women I photographed.” Vincent took a sip of his drink. “It’s art, Clara. You know that. The body, the light, the way a woman looks when she forgets the camera is there — that’s what I photograph.”',
          },
          {
            kind: 'paragraph',
            text:
              '“And the ones who don’t forget?” Clara asked. “The ones who look at you, not at the lens? The ones who want you to see them?”',
          },
          {
            kind: 'paragraph',
            text:
              'Vincent was silent. The ice in his glass melted. Outside, the streetlights came on, one by one, painting the studio windows with orange light.',
          },
          {
            kind: 'paragraph',
            text:
              'Clara finished her wine and set the glass down. “I’m not asking you to stop photographing,” she said. “I’m asking you to stop keeping secrets. The camera goes both ways, Vincent. I see you now, the way you see them. And I don’t like what I see.”',
          },
          {
            kind: 'paragraph',
            text:
              'Vincent did not answer. He stood up, walked to the studio, and closed the door. Clara remained in the living room, the empty glass in her hand, the key on the table. She did not go to sleep that night. She sat in the dark and waited for the morning, and for the decision she knew she would have to make.',
          },
        ],
      },
    ],
  },
  {
    slug: 'after-the-last-metro',
    title: 'After the Last Metro',
    author: 'The Editors',
    kicker: 'Missed trains, midnight streets, and a conversation that lasts until dawn',
    summary:
      'Sarah misses the last metro after a late shift at the hospital. David, also stranded, offers to walk her home through the sleeping city. One night, one walk, and the kind of intimacy that only exists between midnight and morning.',
    tags: ['romance', 'city', 'night', 'conversation'],
    coverAlt: 'Empty metro platform at night, two people walking on a city street',
    contentNote: 'Adult themes, intimacy',
    chapters: [
      {
        title: 'The Last Train',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Sarah looked at the departure board one last time. 00:45, last metro to the east side — cancelled. Signal failure, the automated voice said, and Sarah sighed. She had been working a double shift at the hospital, her feet sore, her scrubs wrinkled, and all she wanted was to get home, crawl into bed, and sleep until morning. Instead she stood on an empty platform at ten past midnight, the city humming around her like a held breath.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              '“You’re stuck too, then.” The voice came from behind her. Sarah turned to see a man in a dark coat, holding a coffee cup, looking at the same board. He was tall, his face half in shadow, his eyes tired in a way she recognised. “Last train. Gone. Signal failure, apparently.”',
          },
          {
            kind: 'image',
            alt: 'Empty metro station platform at night, fluorescent lights, two people waiting',
            caption: 'The last metro never came. The night was just beginning.',
          },
          {
            kind: 'paragraph',
            text:
              '“I’m Sarah,” she said. “And yes, I’m stuck.” She hesitated, then added, “Do you want to walk? It’s only about twenty minutes to my street, and I’d rather not wait here.”',
          },
          {
            kind: 'paragraph',
            text:
              '“David,” he said. “And yes, I’ll walk with you.” They left the station together, the automatic doors sliding shut behind them. The night air was cool, carrying the smell of diesel and late-night food carts. Sarah walked beside David, their footsteps echoing on the empty pavement.',
          },
          {
            kind: 'paragraph',
            text:
              'They talked about small things at first — her shift, his job (he was an architect, working late on a rendering), the city at night, the way the streetlights created islands of orange in the darkness. Sarah found herself relaxing, the tension of the double shift draining from her shoulders with each block they walked.',
          },
        ],
      },
      {
        title: 'The Night Walk',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'As they approached the park, the city grew quieter. The traffic thinned, the streetlights became sparser, and the darkness felt different — not threatening, but intimate. David walked on the side closer to the road, a small gesture Sarah noticed and appreciated. They passed a closed café, its chairs stacked on tables, and a newsstand with its shutter down.',
          },
          {
            kind: 'image',
            alt: 'Two people walking down a quiet city street at night, streetlights overhead',
            caption: 'Midnight streets, and the space between two strangers grows smaller.',
          },
          {
            kind: 'paragraph',
            text:
              '“Do you do this often?” David asked. “Walk home with strangers at midnight?”',
          },
          {
            kind: 'paragraph',
            text:
              '“No,” Sarah said. “But tonight feels different.” She looked at him — really looked — and saw not a stranger but a man who was also tired, also alone, also looking for something he could not name. “You could be anyone,” she said. “And I could be anyone. And tonight, that’s enough.”',
          },
          {
            kind: 'paragraph',
            text:
              'David stopped walking. They were on a quiet residential street, the houses dark, the lawns silver in the moonlight. He turned to Sarah, and for a moment neither of them moved. Then he reached out and touched her face, his thumb brushing her cheek, and Sarah did not pull away. She leaned into his touch, her eyes closing, and when he kissed her, it was soft and slow, like the city itself was holding its breath.',
          },
          {
            kind: 'paragraph',
            text:
              'They walked the rest of the way to Sarah’s street in silence, but the silence was different now — not empty, but full. When they reached her building, David stopped at the gate. “Do you want me to come up?” he asked.',
          },
          {
            kind: 'paragraph',
            text:
              'Sarah looked at her door, then at David — his face in the moonlight, his hand still near hers. The night was ending, dawn was coming, and she had to make a choice. “Yes,” she said. “Come up.”',
          },
        ],
      },
    ],
  },
  {
    slug: 'the-monsoon-letters',
    title: 'The Monsoon Letters',
    author: 'The Editors',
    kicker: 'Rain-soaked afternoons, old letters found in a drawer, and a love story told across decades',
    summary:
      'When Aisha moves into her grandmother’s old house in Kerala, she finds a bundle of letters tied with ribbon — love letters from the 1980s, written by a man she has never heard of. As the monsoon breaks, she begins to piece together a romance that was never finished, and wonders whether some stories are meant to be continued.',
    tags: ['romance', 'kerala', 'letters', 'monsoon'],
    coverAlt: 'Old letters tied with ribbon, rain falling against a window',
    contentNote: 'Adult themes, nostalgia, intimacy',
    chapters: [
      {
        title: 'The Bundle',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'The house smelled of cardamom and damp wood, the way old houses in Kerala do when the monsoon has been raining for weeks. Aisha had inherited it from her grandmother, who had lived there alone for forty years after her husband died. She had come to escape the city, to write her thesis, to find quiet. Instead she found the letters.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'They were in the top drawer of the writing desk, wrapped in a faded red ribbon that crumbled when she touched it. Twenty or so envelopes, yellowed at the edges, all addressed to Amma — her grandmother’s name before she was married — from a man named Raghav. Aisha sat on the floor and opened the first one. The rain drummed on the corrugated roof above her.',
          },
          {
            kind: 'image',
            alt: 'Bundle of old letters tied with red ribbon on a wooden desk',
            caption: 'Letters from the 1980s, waiting to be read.',
          },
          {
            kind: 'paragraph',
            text:
              'Raghav wrote like a man who had never expected to be read. He wrote about the scent of jasmine in the garden after rain, about the way Amma used to laugh when she was embarrassed, about the cinema they had gone to in Trivandrum, about the book he had lent her that she never returned. He wrote about wanting to touch her hand, about being afraid to ask, about leaving for Bombay the week after the rains stopped.',
          },
          {
            kind: 'paragraph',
            text:
              'Aisha read them all in one afternoon, the rain unrelenting outside, and when she finished she sat very still. She had never known her grandmother as a young woman. To Aisha, Amma had always been the woman who made strong filter coffee, who scolded her for leaving wet towels on the bed, who prayed every evening before the tulsi plant. These letters showed her someone else — someone who had been loved, and who had loved back, and who had let that love go.',
          },
          {
            kind: 'paragraph',
            text:
              'The last letter was undated, shorter than the others. “I am leaving tomorrow,” Raghav wrote. “If you want to meet me at the bus stop, come at six. If you do not come, I will understand. I will always wonder what might have been.” Aisha closed her eyes. She could imagine her grandmother at nineteen, standing at the edge of a decision, the rain falling, the bus approaching.',
          },
        ],
      },
      {
        title: 'The Answer',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'That evening, Aisha walked down to the village bus stop. It was the same one Raghav would have used, she imagined, though the road had been paved since then and the old tea stall was closed. The rain had eased to a drizzle, and the air was thick with the smell of wet earth. She stood under the shelter and waited, not for Raghav — he was long gone, probably dead by now — but for some sense of what her grandmother had chosen.',
          },
          {
            kind: 'image',
            alt: 'Village bus stop in the rain, empty shelter, wet road stretching away',
            caption: 'The same bus stop, decades later.',
          },
          {
            kind: 'paragraph',
            text:
              'An old woman walked up, wrapped in a sari the colour of dried leaves. She did not speak at first, just stood beside Aisha and looked down the road. Then she said, “You found them, didn’t you?” Her voice was soft, not surprised.',
          },
          {
            kind: 'paragraph',
            text:
              'Aisha handed her the letters. The woman took them with trembling hands, ran her fingers over the ribbon, and smiled. “Raghav,” she said. “He was the chemistry teacher. He taught at the college for three years, then left for Bombay to become a scientist. I never told anyone about these letters. Not even your grandfather.”',
          },
          {
            kind: 'paragraph',
            text:
              '"Did you love him?" Aisha asked.',
          },
          {
            kind: 'paragraph',
            text:
              'The woman looked at her, and for a moment Aisha saw her grandmother not as an old woman but as a young one, standing in the rain at a bus stop, her heart in her throat. “I loved him,” the woman said. “But I loved this house more. I loved the garden, the trees, the quiet. I loved the life I was already building. So I did not come.”',
          },
          {
            kind: 'paragraph',
            text:
              'Aisha sat with her on the bench as the drizzle turned back into rain. They did not speak much. There was nothing more to say. When the woman stood to leave, she pressed one of the letters into Aisha’s hand — the last one, the undated one — and closed Aisha’s fingers around it. “Keep it,” she said. “Some stories deserve an ending, even if it comes late.”',
          },
          {
            kind: 'paragraph',
            text:
              'Aisha walked back to the house in the rain, the letter in her pocket, and that night she wrote her own letter — not to Raghav, who would never read it, but to her grandmother. She told her about the house, about the garden, about the monsoon that had brought her here. And she told her that she understood now, that some loves are not meant to be finished, and that choosing a life is not the same as losing one.',
          },
        ],
      },
    ],
  },
  {
    slug: 'room-14-third-floor',
    title: 'Room 14, Third Floor',
    author: 'The Editors',
    kicker: 'A boarding house with rules, a locked room, and the tenant who breaks them all',
    summary:
      'Arjun moves into a cheap boarding house in Pune with one rule: do not go to Room 14 on the third floor. Of course, he goes. What he finds is not a ghost, but a woman who has been hiding there for years, and a secret that changes both their lives.',
    tags: ['mystery', 'pune', 'boarding', 'secret'],
    coverAlt: 'A boarding house hallway, door number 14 slightly ajar',
    contentNote: 'Adult themes, suspense, intimacy',
    chapters: [
      {
        title: 'The Rule',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Mrs. Desai made the rule clear before Arjun even saw his room. “Third floor, Room 14,” she said, tapping her ledger with a pen. “That room is out of bounds. No one goes there. Not you, not anyone. Do you understand?”',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'Arjun nodded. He was twenty-four, new to Pune, starting a job at a call center that paid just enough for a bed in a shared boarding house. He did not care about rules. He cared about the rent, which was half of what every other place charged, and about the fact that Mrs. Desai had not asked for a reference.',
          },
          {
            kind: 'image',
            alt: 'Boarding house staircase leading to third floor, number 14 on a door',
            caption: 'The rule: do not go to Room 14.',
          },
          {
            kind: 'paragraph',
            text:
              'His room was on the second floor, small and smelling of old cigarettes, with a window that looked onto a brick wall. He shared a bathroom with three other men. It was fine. It was temporary. He told himself he would stay a month, save money, move somewhere better. But a week passed, then two, and he found himself looking at the third-floor landing every time he climbed the stairs.',
          },
          {
            kind: 'paragraph',
            text:
              'Room 14 was at the end of the corridor, the door painted a faded green that matched nothing else in the house. There was no number on it, just a small brass plaque that said 14. The door was always closed. Sometimes, late at night, Arjun thought he heard music from behind it — faint, old film songs, playing too quietly to make out the words.',
          },
          {
            kind: 'paragraph',
            text:
              'One Tuesday, coming back from his night shift, Arjun found the door ajar. Not open, just slightly — a crack of darkness, a sliver of light. He should have knocked, should have gone to his room, should have forgotten about it. He pushed the door open instead.',
          },
        ],
      },
      {
        title: 'The Woman in the Room',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'The room was not what he expected. It was clean, almost spare — a bed with a iron frame, a small table, a wardrobe, a window that looked out over the rooftops of Pune. And on the bed sat a woman, maybe his age, maybe older, wearing a salwar kameez the colour of midnight. She did not scream. She did not run. She looked at him, and he looked at her, and the music stopped.',
          },
          {
            kind: 'paragraph',
            text:
              '"Who are you?" Arjun asked. His voice sounded loud in the quiet room.',
          },
          {
            kind: 'paragraph',
            text:
              '"Meera," she said. Her voice was calm, tired. "And you are Arjun. Mrs. Desai told me about you. New tenant, second floor."',
          },
          {
            kind: 'paragraph',
            text:
              'She knew his name. She knew about Mrs. Desai. Arjun backed up a step, then stopped himself. "Why are you here? This room is out of bounds."',
          },
          {
            kind: 'paragraph',
            text:
              'Meera smiled, a sad little tilt of her lips. "I have been here three years. Mrs. Desai lets me stay because I have nowhere else to go. Because I cannot go home. Because this room is the only place in the city where I am safe."',
          },
          {
            kind: 'paragraph',
            text:
              'Arjun should have left. He should have closed the door, told Mrs. Desai, pretended this never happened. Instead he stepped further into the room. "Safe from what?"',
          },
        ],
      },
      {
        title: 'The Secret',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Meera told him then, slowly, in pieces, over the course of that night and the next. She had been married to a man in Mumbai who did not want her to work, who did not want her to have friends, who did not want her to be herself. When she left, he found her. He came to her office, her friends’ houses, her parents’ door. She ran to Pune, changed her name, and found Room 14, where Mrs. Desai asked no questions and gave no one her address.',
          },
          {
            kind: 'image',
            alt: 'Train ticket, old phone, packed bag on a bed',
            caption: 'The things Meera brought with her when she ran.',
          },
          {
            kind: 'paragraph',
            text:
              'Arjun listened, and the more he heard, the more he wanted to protect her — not because she was weak, but because she was strong, and strength like hers deserved safety. They started talking every evening, on the landing or in her room, sharing tea that Mrs. Desai brought up without asking. Arjun told her about his call-center job, about his family in Nagpur, about the girl he had almost married in college. Meera told him about the books she read, the films she watched alone, the food she cooked when she was lonely.',
          },
          {
            kind: 'paragraph',
            text:
              'One rainy Thursday, Meera opened her door before Arjun could knock. She was wearing a sari instead of her salwar kameez, her hair loose, her face unguarded. "Stay," she said. "Just for tonight. Please."',
          },
          {
            kind: 'paragraph',
            text:
              'He stayed. They did not talk much. They sat on her bed, shoulder to shoulder, and when he kissed her, she did not pull away. It was gentle at first, tentative, as if they were both afraid of breaking something. Then it was not gentle at all, and the room was warm, and the rain hammered on the roof, and for the first time in three years Meera did not look over her shoulder.',
          },
          {
            kind: 'paragraph',
            text:
              'The next morning, Mrs. Desai knocked on Arjun’s door. "Room 14 is empty," she said. "Meera left last night. She left a letter for you."',
          },
          {
            kind: 'paragraph',
            text:
              'Arjun went to the room. The bed was made, the wardrobe closed, the window open to the Pune rooftops. On the table was an envelope with his name on it. Inside was a single sheet of paper: Thank you, Arjun. You were kind to me when no one else was. I am going home. I hope you find your own safety, too. — Meera.',
          },
          {
            kind: 'paragraph',
            text:
              'Arjun folded the letter and put it in his pocket. He went to Mrs. Desai and asked if Room 14 was available. She looked at him, long and steady, and said, "It is. But the rule still applies. No one goes there." Arjun smiled. "I already have," he said. And he took the key.',
          },
        ],
      },
    ],
  },
  {
    slug: 'what-the-dark-kept',
    title: 'What the Dark Kept',
    author: 'The Editors',
    kicker: 'A power cut, an old house, and the things that come out when the lights go off',
    summary:
      'Ira hates the dark. When a storm knocks out the power in her ancestral home in Coorg, she is forced to spend the night by candlelight. But the dark keeps things — memories, secrets, and a presence that has been waiting for her to come home.',
    tags: ['drama', 'coorg', 'ghost', 'family'],
    coverAlt: 'Candlelight in an old house, shadows moving on the wall',
    contentNote: 'Adult themes, supernatural suspense, intimacy',
    chapters: [
      {
        title: 'The Power Cut',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Ira had not been back to Coorg in ten years. Not since her mother died, not since the funeral, not since she had packed her life into two suitcases and left for Bangalore, then Delhi, then London. She had come back for her father’s estate, to sign papers, to sell the house, and to leave again as quickly as possible.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'The house was exactly as she remembered it — teak floors, high ceilings, windows that looked out onto coffee plantations stretching into the mist. It was also full of her mother’s things, which was the part Ira had not been ready for. Sarees in the wardrobe, books on the shelves, a cup with a chipped rim on the kitchen counter, as if her mother had only stepped out for a moment.',
          },
          {
            kind: 'image',
            alt: 'Ancestral home in Coorg, teak floors, coffee plantation mist outside windows',
            caption: 'The house her mother left behind.',
          },
          {
            kind: 'paragraph',
            text:
              'The storm broke at six in the evening. The lights flickered, then died. Ira found candles in a drawer in the kitchen, matches in another, and lit them one by one, moving from room to room. The candlelight made the house look different — softer, stranger, full of shadows that moved when she was not looking directly at them.',
          },
          {
            kind: 'paragraph',
            text:
              'She hated the dark. She had hated it since she was a child, since the night her mother had come to her room during a power cut and sat with her until the lights came back, humming a song Ira had forgotten until this moment. She lit more candles. She told herself she was being silly. She was thirty-three years old. She did not believe in ghosts.',
          },
        ],
      },
      {
        title: 'The Candlelight',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'By nine o’clock, the rain was hammering on the roof and the candles were guttering. Ira was in her mother’s old room, sorting through a box of photographs, when she heard it — a soft humming, coming from the corridor outside. She froze. The house was empty. She was alone.',
          },
          {
            kind: 'paragraph',
            text:
              'She picked up the nearest candle and walked to the door. The corridor was dark beyond the circle of candlelight, shadows pooling at the far end. The humming stopped when she opened the door. She stepped out, her bare feet cold on the teak floor, and called out, “Hello?”',
          },
          {
            kind: 'paragraph',
            text:
              'No answer. She walked down the corridor, the candle flame dancing in the draft. At the end was her mother’s wardrobe, the one she had opened a hundred times as a child. She opened it now, and inside, behind the hanging sarees, was a small door she had never noticed before. It was ajar, just enough to let out a breath of cold air.',
          },
          {
            kind: 'paragraph',
            text:
              'Ira knelt down. The candlelight illuminated a narrow staircase going down, into darkness. She should have closed the door. She should have gone back to her room, locked it, waited for morning. Instead she took a breath and descended.',
          },
        ],
      },
      {
        title: 'The Cellar',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'The cellar was not a cellar. It was a room, small and windowless, with stone walls and a dirt floor. In the center was a wooden chest, and on the chest was a photograph — her mother, young, standing beside a man Ira did not recognize. He was tall, his arm around her mother’s waist, both of them smiling in a way Ira had never seen her smile.',
          },
          {
            kind: 'image',
            alt: 'Stone-walled room, wooden chest, photograph of young woman and man',
            caption: 'What the dark kept hidden for thirty years.',
          },
          {
            kind: 'paragraph',
            text:
              'She picked up the photograph. On the back, in her mother’s handwriting: Arun. 1984. Before everything changed. Ira sat on the floor and looked at the photograph, and the darkness around her felt different now — not empty, but full. Full of the life her mother had lived before Ira was born, before the marriage, before the silence that had filled their house for years.',
          },
          {
            kind: 'paragraph',
            text:
              'She heard footsteps above. Her father’s voice, calling her name. She climbed the stairs, the photograph in her hand, and found him in the kitchen, holding a flashlight. The power was back on. The house was bright, ordinary, safe.',
          },
          {
            kind: 'paragraph',
            text:
              '"Ira," he said. "Are you all right? I heard you moving around."',
          },
          {
            kind: 'paragraph',
            text:
              'She showed him the photograph. He looked at it, and something in his face softened, then hardened. "Arun," he said. "Your mother’s first love. Before me. Before this house. Before you."',
          },
          {
            kind: 'paragraph',
            text:
              '"Why did you keep this hidden?" Ira asked.',
          },
          {
            kind: 'paragraph',
            text:
              'Her father sighed, leaning against the counter. "Because some things are better kept in the dark. Not because they are shameful, but because they are sacred. Your mother loved Arun. She also loved me. She chose this house, she chose me, she chose you. The dark kept her secrets, but the light gave her a family."',
          },
          {
            kind: 'paragraph',
            text:
              'Ira looked at the photograph, then at her father, and for the first time in ten years she felt the weight of the house lift. She did not sell the house. She put the photograph back in the chest, closed the small door, and went to bed with the lights on — not because she was afraid of the dark anymore, but because she understood what it had kept, and what it had let go.',
          },
        ],
      },
    ],
  },
  {
    slug: 'the-taste-of-salt',
    title: 'The Taste of Salt',
    author: 'The Editors',
    kicker: 'A coastal town, a fish market at dawn, and two strangers who keep meeting',
    summary:
      'Nisha runs her family’s fish stall in Goa, up before dawn every day to buy the catch. Sameer is a marine biologist who has come to study the coastline. They keep meeting at the market, at the beach, in the rain, and slowly they begin to share more than just the morning air.',
    tags: ['romance', 'goa', 'coast', 'sea'],
    coverAlt: 'Fish market at dawn, two people talking by the sea',
    contentNote: 'Adult themes, sensuality, intimacy',
    chapters: [
      {
        title: 'The Fish Market',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'Nisha was at the market by four every morning, before the sun, before the tourists, before the sea had finished giving up its catch. She knew the fishermen by name, knew which boats brought the best kingfish, knew how to haggle for prawns without losing her temper. It was her life, her father’s life before her, her grandfather’s before him. The salt was in her skin, in her hair, in the way she tasted the air and knew when a storm was coming.',
            dropCap: true,
          },
          {
            kind: 'paragraph',
            text:
              'Sameer arrived in October, with a notebook, a sunburn, and a research permit from the university. He was a marine biologist, studying coral bleaching along the Goan coast. He came to the market not to buy, but to ask questions — about water temperature, about fish populations, about the changes he had been seeing in the reefs. Nisha answered him briefly, efficiently, and tried to ignore the way he looked at her, as if she were something worth studying too.',
          },
          {
            kind: 'image',
            alt: 'Goan fish market at dawn, boats unloading catch, two people talking',
            caption: 'The market at dawn, where they keep meeting.',
          },
          {
            kind: 'paragraph',
            text:
              'He came back the next day. And the next. Not every day, but often enough that Nisha began to expect him — to look for his notebook, his sunburn, his quiet questions. She started saving him the best mackerel, the ones her father would have sold for a premium. He started bringing her coffee from the stall near the jetty, strong and sweet, the way she took it.',
          },
          {
            kind: 'paragraph',
            text:
              'They did not talk about themselves at first. They talked about the sea, about the tides, about the monsoon that was late that year, about the fish that were not where they used to be. But slowly, between weighing prawns and recording data, they began to share more. Sameer told her about growing up in Delhi, about the landlocked city he had left, about the first time he had seen the ocean and felt, for the first time, that he could breathe. Nisha told her about her mother, who had died when she was twelve, about her father who had taught her to clean fish before she could ride a bicycle, about the stall that was hers now.',
          },
        ],
      },
      {
        title: 'The Beach',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'One evening, Sameer invited her to the beach. Not the tourist beach, but the quiet one south of the village, where the rocks jutted out into the Arabian Sea and the waves came in clean and cold. They walked along the shore, the sand wet under their feet, the sky turning the colour of a bruise as the sun set.',
          },
          {
            kind: 'paragraph',
            text:
              '"Do you like it here?" Sameer asked. "Goa. The coast."',
          },
          {
            kind: 'paragraph',
            text:
              'Nisha looked at him — the salt in his hair, the wind in his shirt, the way he stood as if he belonged here even though he did not. "Yes," she said. "It is hard. The salt ruins everything eventually. But it is beautiful."',
          },
          {
            kind: 'paragraph',
            text:
              'They sat on a rock, their shoulders touching, and watched the sun disappear into the water. Sameer turned to her, and she turned to him, and when he kissed her, it tasted of salt and sea and the end of the day. She did not pull away. She kissed him back, her hands in his hair, and the waves crashed below them, and for the first time in years Nisha felt like she was exactly where she was meant to be.',
          },
          {
            kind: 'paragraph',
            text:
              'They did not go far that night. They walked back to the village in the dark, holding hands, and Sameer walked her to her door. "Tomorrow?" he asked.',
          },
          {
            kind: 'paragraph',
            text:
              '"Tomorrow," Nisha said. And she meant it.',
          },
        ],
      },
      {
        title: 'The Rain',
        blocks: [
          {
            kind: 'paragraph',
            text:
              'The monsoon finally came in November, late and fierce. The market flooded, the boats stayed in, and for three days Nisha and Sameer were thrown together in her small apartment above the stall, the rain hammering on the roof, the power flickering, the smell of fish and wet wood everywhere.',
          },
          {
            kind: 'image',
            alt: 'Rainy day in Goa, apartment window looking out at flooded street',
            caption: 'Three days of rain, and nowhere else to be.',
          },
          {
            kind: 'paragraph',
            text:
              'They cooked rice and fish curry together, ate off the same plate, and when the lights went out they lit a candle and sat on the floor, backs against the sofa, talking in the dim light. Sameer told her about the reefs, about how some corals survived the bleaching and some did not, about how he had come to Goa because he needed to believe that something could recover. Nisha told him about the stall, about her father, about how she had thought she would never leave Goa, and now was not so sure.',
          },
          {
            kind: 'paragraph',
            text:
              '"Where would you go?" Sameer asked.',
          },
          {
            kind: 'paragraph',
            text:
              '"Wherever you are," Nisha said.',
          },
          {
            kind: 'paragraph',
            text:
              'He kissed her then, and this time it was not tentative. It was deep, certain, the kind of kiss that comes after weeks of almost-touching, of shared coffees and saved mackerel and conversations that lasted past midnight. She pulled him closer, her hands on his face, and the rain fell outside, and the candle flickered, and the world was small and warm and entirely theirs.',
          },
          {
            kind: 'paragraph',
            text:
              'When the rain stopped on the fourth morning, the market was muddy but open. The fishermen were back with their catch, the salt was in the air again, and Nisha opened the stall as usual. Sameer came at four, as he always did, and she saved him the best kingfish, and they drank their coffee, and she told him she was not leaving. Not yet. Maybe never.',
          },
        ],
      },
    ],
  },
];
