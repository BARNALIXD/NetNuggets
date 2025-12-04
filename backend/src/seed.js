require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Website = require('./models/Website');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/netnuggets', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Website.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@netnuggets.com',
      password: 'admin123', // Will be hashed automatically
      role: 'admin',
    });
    await admin.save();
    console.log('👑 Admin user created');
    console.log('   Email: admin@netnuggets.com');
    console.log('   Password: admin123');

    // Create regular user
    const user = new User({
      name: 'barnalixd',
      email: 'user@example.com',
      password: 'user123',
      role: 'user',
    });
    await user.save();
    console.log('👤 Regular user created');
    console.log('   Name: barnalixd');
    console.log('   Email: user@example.com');
    console.log('   Password: user123');

    // Create sample websites
    const websites = [
      {
        name: 'Notion',
        url: 'https://notion.so',
        description: 'All-in-one workspace for notes, tasks, wikis, and databases',
        category: 'Productivity',
        thumbnail: '📝',
        featured: true,
        approved: true,
        ratings: [5, 5, 4, 5, 5],
        submittedBy: admin._id,
      },
      {
        name: 'Dribbble',
        url: 'https://dribbble.com',
        description: 'Platform for designers to showcase and discover creative work',
        category: 'Design',
        thumbnail: '🎨',
        featured: true,
        approved: true,
        ratings: [5, 4, 5, 4, 5],
        submittedBy: admin._id,
      },
      {
        name: 'GitHub',
        url: 'https://github.com',
        description: 'Code hosting platform for version control and collaboration',
        category: 'Developer Tools',
        thumbnail: '💻',
        featured: true,
        approved: true,
        ratings: [5, 5, 5, 5, 4],
        submittedBy: admin._id,
      },
      {
        name: 'Poolside.fm',
        url: 'https://poolside.fm',
        description: 'Summertime music player with retro vibes',
        category: 'Entertainment',
        thumbnail: '🏖️',
        featured: false,
        approved: true,
        ratings: [4, 5, 4, 5],
        submittedBy: admin._id,
      },
      {
        name: 'Khan Academy',
        url: 'https://khanacademy.org',
        description: 'Free world-class education for anyone, anywhere',
        category: 'Learning',
        thumbnail: '🎓',
        featured: false,
        approved: true,
        ratings: [5, 5, 5, 4],
        submittedBy: admin._id,
      },
      {
        name: 'Awwwards',
        url: 'https://awwwards.com',
        description: 'Website awards for design, creativity and innovation',
        category: 'Inspiration',
        thumbnail: '🏆',
        featured: true,
        approved: true,
        ratings: [5, 4, 5, 4],
        submittedBy: admin._id,
      },
      {
        name: 'CodePen',
        url: 'https://codepen.io',
        description: 'Social development environment for front-end designers',
        category: 'Developer Tools',
        thumbnail: '✏️',
        featured: false,
        approved: true,
        ratings: [5, 4, 5, 5],
        submittedBy: admin._id,
      },
      {
        name: 'Figma',
        url: 'https://figma.com',
        description: 'Collaborative interface design tool in the browser',
        category: 'Design',
        thumbnail: '🎯',
        featured: true,
        approved: true,
        ratings: [5, 5, 5, 5, 5],
        submittedBy: admin._id,
      },
      {
        name: 'ChatGPT',
        url: 'https://chat.openai.com',
        description: 'Advanced AI chatbot for conversation and assistance',
        category: 'AI Tools',
        thumbnail: '🤖',
        featured: true,
        approved: true,
        ratings: [5, 5, 4, 5],
        submittedBy: admin._id,
      },
      {
        name: 'Raindrop.io',
        url: 'https://raindrop.io',
        description: 'Beautiful bookmark manager for organizing content',
        category: 'Productivity',
        thumbnail: '🔖',
        featured: false,
        approved: true,
        ratings: [4, 5, 4, 5],
        submittedBy: admin._id,
      },
      {
        name: 'The Useless Web',
        url: 'https://theuselessweb.com',
        description: 'Takes you to random useless but entertaining websites',
        category: 'Entertainment',
        thumbnail: '🎪',
        featured: false,
        approved: true,
        ratings: [4, 4, 5, 4],
        submittedBy: admin._id,
      },
      {
        name: 'Coursera',
        url: 'https://coursera.org',
        description: 'Online courses from top universities worldwide',
        category: 'Learning',
        thumbnail: '📚',
        featured: false,
        approved: true,
        ratings: [5, 4, 5, 5],
        submittedBy: admin._id,
      },
    ];

    await Website.insertMany(websites);
    console.log(`🌐 Created ${websites.length} sample websites`);

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin: admin@netnuggets.com / admin123');
    console.log('   User: barnalixd (user@example.com / user123)');
    console.log('\n🔑 Admin code:', process.env.ADMIN_SECRET_CODE);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
