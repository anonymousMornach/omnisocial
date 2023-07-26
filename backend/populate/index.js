const User = require('../schema/User');
const Post = require('../schema/Post');
const { hashPassword } = require('../middleware/auth');
require("dotenv").config();
require('../database/mongoDb');

const userDataList = [
    {
        "name": "John Smith",
        "username": "johnsmith",
        "email": "john.smith@example.com",
        "password": "password123"
    },
    {
        "name": "Emma Johnson",
        "username": "emmajohnson",
        "email": "emma.johnson@example.com",
        "password": "password456"
    },
    {
        "name": "Michael Brown",
        "username": "michaelbrown",
        "email": "michael.brown@example.com",
        "password": "password789"
    },
    {
        "name": "Sophia Williams",
        "username": "sophiawilliams",
        "email": "sophia.williams@example.com",
        "password": "password321"
    },
    {
        "name": "James Taylor",
        "username": "jamestaylor",
        "email": "james.taylor@example.com",
        "password": "password654"
    },
    {
        "name": "Olivia Martinez",
        "username": "oliviamartinez",
        "email": "olivia.martinez@example.com",
        "password": "password987"
    },
    {
        "name": "Noah Anderson",
        "username": "noahanderson",
        "email": "noah.anderson@example.com",
        "password": "password789"
    },
    {
        "name": "Isabella Thomas",
        "username": "isabellathomas",
        "email": "isabella.thomas@example.com",
        "password": "password987"
    },
    {
        "name": "Liam Jackson",
        "username": "liamjackson",
        "email": "liam.jackson@example.com",
        "password": "password123"
    },
    {
        "name": "Ava White",
        "username": "avawhite",
        "email": "ava.white@example.com",
        "password": "password456"
    },
    // Add more user data objects as needed
    // ...
    {
        "name": "Elijah Green",
        "username": "elijahgreen",
        "email": "elijah.green@example.com",
        "password": "password654"
    },
    {
        "name": "Mia Perez",
        "username": "miaperez",
        "email": "mia.perez@example.com",
        "password": "password987"
    },
    {
        "name": "Benjamin Carter",
        "username": "benjamincarter",
        "email": "benjamin.carter@example.com",
        "password": "password789"
    },
    {
        "name": "Avery Evans",
        "username": "averyevans",
        "email": "avery.evans@example.com",
        "password": "password123"
    },
    {
        "name": "Abigail Rivera",
        "username": "abigailrivera",
        "email": "abigail.rivera@example.com",
        "password": "password456"
    },
    {
        "name": "Mateo Lee",
        "username": "mateolee",
        "email": "mateo.lee@example.com",
        "password": "password789"
    },
    {
        "name": "Scarlett Scott",
        "username": "scarlettscott",
        "email": "scarlett.scott@example.com",
        "password": "password987"
    },
    {
        "name": "Daniel Adams",
        "username": "danieladams",
        "email": "daniel.adams@example.com",
        "password": "password321"
    },
    {
        "name": "Victoria Baker",
        "username": "victoriabaker",
        "email": "victoria.baker@example.com",
        "password": "password654"
    },
    {
        "name": "Sebastian Morris",
        "username": "sebastianmorris",
        "email": "sebastian.morris@example.com",
        "password": "password987"
    },
    // Add more user data objects as needed
    // ...
    {
        "name": "Lily Turner",
        "username": "lilyturner",
        "email": "lily.turner@example.com",
        "password": "password789"
    },
    {
        "name": "Carter Foster",
        "username": "carterfoster",
        "email": "carter.foster@example.com",
        "password": "password123"
    },
    {
        "name": "Grace Powell",
        "username": "gracepowell",
        "email": "grace.powell@example.com",
        "password": "password456"
    },
    {
        "name": "Ryan Cooper",
        "username": "ryancooper",
        "email": "ryan.cooper@example.com",
        "password": "password321"
    },
    {
        "name": "Audrey Ramirez",
        "username": "audreyramirez",
        "email": "audrey.ramirez@example.com",
        "password": "password654"
    },
    {
        "name": "Lucas Reed",
        "username": "lucasreed",
        "email": "lucas.reed@example.com",
        "password": "password987"
    },
    {
        "name": "Chloe Turner",
        "username": "chloeturner",
        "email": "chloe.turner@example.com",
        "password": "password321"
    },
    {
        "name": "Jackson Hughes",
        "username": "jacksonhughes",
        "email": "jackson.hughes@example.com",
        "password": "password456"
    },
    {
        "name": "Penelope Mitchell",
        "username": "penelopemitchell",
        "email": "penelope.mitchell@example.com",
        "password": "password789"
    },
    {
        "name": "Samuel Simmons",
        "username": "samuelsimmons",
        "email": "samuel.simmons@example.com",
        "password": "password123"
    },
    // Add more user data objects as needed
    // ...
    {
        "name": "Nora Peterson",
        "username": "norapeterson",
        "email": "nora.peterson@example.com",
        "password": "password654"
    },
    {
        "name": "Eliana Ramirez",
        "username": "elianaramirez",
        "email": "eliana.ramirez@example.com",
        "password": "password987"
    },
    {
        "name": "Jonathan Griffin",
        "username": "jonathangriffin",
        "email": "jonathan.griffin@example.com",
        "password": "password789"
    },
    {
        "name": "Caroline Rodriguez",
        "username": "carolinerodriguez",
        "email": "caroline.rodriguez@example.com",
        "password": "password123"
    },
    {
        "name": "Leo Carter",
        "username": "leocarter",
        "email": "leo.carter@example.com",
        "password": "password456"
    },
    {
        "name": "Stella Rivera",
        "username": "stellarivera",
        "email": "stella.rivera@example.com",
        "password": "password321"
    },
    {
        "name": "Jeremiah Cox",
        "username": "jeremiahcox",
        "email": "jeremiah.cox@example.com",
        "password": "password654"
    },
    {
        "name": "Vivian Ward",
        "username": "vivianward",
        "email": "vivian.ward@example.com",
        "password": "password987"
    },
    {
        "name": "Julian Powell",
        "username": "julianpowell",
        "email": "julian.powell@example.com",
        "password": "password321"
    },
    {
        "name": "Bella Washington",
        "username": "bellawashington",
        "email": "bella.washington@example.com",
        "password": "password456"
    },
    {
        "name": "Taiwo Ifedayo",
        "username": "techmornach",
        "email": "techmornach@gmail.com",
        "password":"drojuope"
    }
]


const postDataList = [
    {
        "title": "Exciting Adventure in the Mountains",
        "body": "Spent the weekend hiking in the breathtaking mountains. It was an unforgettable experience!"
    },
    {
        "title": "Delicious Homemade Recipe",
        "body": "Tried a new recipe today, and it turned out to be a hit among my family. Sharing it here for others to enjoy!"
    },
    {
        "title": "Movie Night with Friends",
        "body": "Watched an amazing movie last night with friends. Highly recommend it!"
    },
    {
        "title": "A Day at the Beach",
        "body": "Enjoyed a sunny day at the beach, building sandcastles and playing beach volleyball."
    },
    {
        "title": "Visiting Historical Sites",
        "body": "Explored fascinating historical sites today, learning about the past and its significance."
    },
    {
        "title": "New Book Discovery",
        "body": "Started reading a new book today, and I'm already captivated by the story. Can't wait to see how it unfolds!"
    },
    {
        "title": "Artistic Creativity",
        "body": "Spent the afternoon painting and expressing my artistic side. Art is truly therapeutic!"
    },
    {
        "title": "Volunteering Experience",
        "body": "Had a fulfilling time volunteering at a local shelter. Small acts of kindness can make a big difference!"
    },
    {
        "title": "Family Reunion",
        "body": "Reunited with extended family after a long time. Laughter, stories, and love filled the day."
    },
    {
        "title": "Sunday Brunch",
        "body": "Indulged in a delicious Sunday brunch with friends, complete with pancakes, eggs, and mimosas."
    },
    {
        "title": "Road Trip Across the Country",
        "body": "Embarked on an epic road trip across the country, witnessing diverse landscapes and meeting interesting people."
    },
    {
        "title": "Camping Under the Starry Sky",
        "body": "Spent the night camping under the clear, starry sky. Nature's beauty is truly awe-inspiring."
    },
    {
        "title": "Fitness Milestone Achieved",
        "body": "Reached a major fitness milestone today. Hard work and dedication pay off!"
    },
    {
        "title": "Volcano Expedition",
        "body": "Ventured on an expedition to explore the breathtaking sight of an active volcano."
    },
    {
        "title": "Savoring Exotic Cuisine",
        "body": "Tried exotic dishes from different cultures today, expanding my culinary horizons."
    },
    {
        "title": "Skydiving Adventure",
        "body": "Took a leap of faith and went skydiving. The rush of adrenaline was exhilarating!"
    },
    {
        "title": "Relaxing Spa Day",
        "body": "Indulged in a relaxing spa day, pampering myself with massages and facials."
    },
    {
        "title": "A Night at the Opera",
        "body": "Attended a grand opera performance, mesmerized by the beautiful voices and stunning stage production."
    },
    {
        "title": "Exploring Hidden Caves",
        "body": "Explored mysterious hidden caves, marveling at the wonders of nature's underground beauty."
    },
    {
        "title": "Meditation Retreat",
        "body": "Participated in a meditation retreat, finding inner peace and tranquility."
    },
    {
        "title": "Stargazing Night",
        "body": "Spent the night stargazing with a telescope. The cosmos is vast and mesmerizing!"
    },
    {
        "title": "Charity Fundraising Event",
        "body": "Organized a charity event to support a local cause. The community's generosity was heartwarming."
    },
    {
        "title": "DIY Home Renovation",
        "body": "Took on a DIY home renovation project, and the results are surprisingly impressive!"
    },
    {
        "title": "Thrilling Roller Coaster Ride",
        "body": "Went on an adrenaline-pumping roller coaster ride at an amusement park. What a rush!"
    },
    {
        "title": "Learning a New Language",
        "body": "Started learning a new language today. Bonjour! Hola! Ciao!"
    },
    {
        "title": "Sustainable Living",
        "body": "Embracing a sustainable lifestyle, making small changes to protect the planet."
    },
    {
        "title": "Local Farmers' Market",
        "body": "Explored the vibrant local farmers' market, enjoying fresh produce and handmade crafts."
    },
    {
        "title": "Music Festival Fun",
        "body": "Attended a music festival and danced the night away to my favorite bands."
    },
    {
        "title": "Baking Adventures",
        "body": "Tried my hand at baking pastries and cakes. The kitchen smells heavenly!"
    },
    {
        "title": "Wildlife Safari",
        "body": "Went on a wildlife safari and spotted majestic animals in their natural habitat."
    },
]

// Function to generate a random image URL
const getRandomImageURL = () => {
    const imageNumber = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${imageNumber}/500/500`;
};

// Function to delete all users and posts from the database
// Function to delete all users and posts from the database
const deleteAllUsersAndPosts = async () => {
    try {
        await User.deleteMany({});
        await Post.deleteMany({});
        console.log('Successfully deleted all users and posts from the database.');
    } catch (err) {
        console.error('Error while deleting data from the database:', err);
    }
};

// Function to get a random subset of elements from an array
const getRandomSubset = (array, subsetSize) => {
    const shuffled = array.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, subsetSize);
};

// Delete all existing users and posts before creating new ones
deleteAllUsersAndPosts().then(() => {
    // Create 50 users and assign 5 random posts for each user
    const usersPromises = userDataList.map(async (userData) => {
        const hashedPassword = await hashPassword(userData.password);

        const newUser = new User({
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            profilePicture: getRandomImageURL(),
        });

        await newUser.save();

        // Get 5 random posts for the user
        const randomPosts = getRandomSubset(postDataList, 5);

        // Create 5 posts for the user
        const userPostsPromises = randomPosts.map(async (postData, index) => {
            const post = new Post({
                title: `${postData.title} by ${userData.username}`,
                body: `${postData.body} (${index + 1})`,
                user: newUser._id,
                image: getRandomImageURL(),
            });

            await post.save();
        });

        await Promise.all(userPostsPromises);
    });

    Promise.all(usersPromises)
        .then(() => {
            console.log(`Successfully created ${userDataList.length} users with 5 posts each.`);
            // Do anything else you want after creating the data here
        })
        .catch((err) => {
            console.error('Error while populating the database:', err);
        });
});
