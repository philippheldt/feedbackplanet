# feedbackplanet

## Gamestate Data Structure

### General

The gamestate of each User is saved in the following Data Structure:\
\
`const gamestate = { username: "USERNAME", points: 0, planet: "non", buildings: [ "non0.no0.no0.no0.no0", "non0.no0.no0.no0.no0", "non0.no0.no0.no0.no0", "non0.no0.no0.no0.no0", "non0.no0.no0.no0.no0", "non0.no0.no0.no0.no0", "non0.no0.no0.no0.no0", "non0.no0.no0.no0.no0", ], sky: ["non", "non", "non", "non", "non", "non", "non", "non"], };`\

### Buildings

\
Each Building is represented in one location of the buildings Array. The Strings are divided by "."s, which make up the building blocks of a building object.
They represent the following:\
\
`"non0.no0.no0.no0.no0"` \
`"BUILDING_TYPE.TREE_BACK_LEFT.TREE_BACK_RIGHT.TREE_FRONT_LEFT.TREE_FRONT_RIGHT"`\
\
The building code consists of 3 digits, followed by the variant Number of the current building stage\
`eif1` would represent the EIFFEL TOWER in Building Stage 1\
An empty section is represented by the String `non0`\
\
Every Tree represents one quarter of the required points to reach the next building stage. Hereby, there are different tree types, which are randomly assigned to the building stage.\
The code consists of two digits representing the tree type, followed by a number representing the variant of the tree type.\
`pi1` is a PINE TREE with the variant 1

## Functions

You can call the feedbackbar by using the following code: `feedbackBarCall(<MESSAGE>, <POINTS>, <FEEDBACK TYPE>)` \

MESSAGE: Message displayed on feedbackbar \
POINTS: How many points were acheived. If no Points shall be displayed `0`removed second Bar call \
FEEDBACK TYPE: Is the class name of the three Feedback colors Green: `feedback-good`, Yellow: `feedback-boost`, Red: `feedback-bad` \
