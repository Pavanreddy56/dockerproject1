/**
 * Seed script to populate sample DevOps questions
 * Run: npm run seed
 */
const mongoose = require('mongoose');
const Question = require('./models/Question');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/devops_app';

const sample = [
  {
    text: 'Which tool is commonly used for container orchestration?',
    options: ['Ansible', 'Kubernetes', 'Jenkins', 'Terraform'],
    answerIndex: 1
  },{
    text: 'Which command lists running Docker containers?',
    options: ['docker ps', 'docker images', 'docker run', 'docker build'],
    answerIndex: 0
  },{
    text: 'Which service is used for object storage in AWS?',
    options: ['EC2', 'S3', 'Lambda', 'RDS'],
    answerIndex: 1
  },{
    text: 'What does CI in CI/CD stand for?',
    options: ['Code Integrate', 'Continuous Integration', 'Container Instance', 'Continuous Ingest'],
    answerIndex: 1
  },{
    text: 'Which tool is used for configuration management (agentless)?',
    options: ['Chef', 'Puppet', 'Ansible', 'Kubernetes'],
    answerIndex: 2
  }
];

async function run() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to', MONGO_URL);
  const count = await Question.countDocuments();
  if (count > 0) {
    console.log('Questions already exist:', count);
    process.exit(0);
  }
  const created = await Question.create(sample);
  console.log('Inserted', created.length, 'questions');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
