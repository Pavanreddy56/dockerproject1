/**
 * Seed script to populate sample DevOps questions
 * Run: npm run seed
 */
const mongoose = require('mongoose');
const Question = require('./models/Question');

// NOTE: keep in sync with your docker-compose environment variable
const MONGO_URL = process.env.MONGO_URI || 'mongodb://admin:password@mongo:27017/devopsdb?authSource=admin';

const questions = [
  // === Existing MCQ questions ===
  {
    question: "Which tool is commonly used for container orchestration?",
    options: ["Ansible", "Kubernetes", "Jenkins", "Terraform"],
    answer: "Kubernetes"
  },
  // ... your 4 other MCQs

  // === Kubernetes questions ===
  { question: "What is the difference between a Deployment and a StatefulSet in Kubernetes?" },
  { question: "When should you use a StatefulSet instead of a Deployment?" },
  { question: "Can you attach a volume to a Deployment? If yes, how is it different from a StatefulSet?" },
  { question: "What could cause a StatefulSet pod to fail when rescheduled to a different availability zone?" },
  { question: "How do PV/PVC behave across zones in EKS or Kubernetes in general?" },
  { question: "What is a DaemonSet and when would you use it?" },
  { question: "If you want two pods per node (instead of one), what alternatives to DaemonSet can you use?" },
  { question: "What is a Pod Disruption Budget (PDB) and how is it useful?" },
  { question: "How do you handle certificate rotation in on-prem Kubernetes clusters?" },
  { question: "What are the challenges with scheduling pods in a multi-node, multi-AZ setup?" },
  { question: "How does the Kubernetes scheduler decide where to place pods?" },
  { question: "What happens when a StatefulSet pod cannot mount its volume after moving to another node?" },

  // === Terraform questions ===
  { question: "What are common challenges faced while working with Terraform?" },
  { question: "How do you handle state file management in Terraform?" },
  { question: "How do you detect and resolve drift in Terraform-managed infrastructure?" },
  { question: "How do you manage secrets securely in Terraform?" },
  { question: "Why should you use a remote backend for Terraform?" },

  // === AWS & Networking ===
  { question: "What are all the possible ways to deploy an Nginx server on AWS?" },
  { question: "What are the pre-requisites for VPC peering between two VPCs?" },
  { question: "What problems occur when two VPCs have overlapping CIDR blocks?" },
  { question: "How can you enable communication between overlapping CIDR VPCs?" },
  { question: "What is a Transit Gateway and how does it help in VPC communication?" },
  { question: "How can a jump server be used in overlapping network scenarios?" },
  { question: "Can you explain transitive routing between VPCs A, B, and C?" },

  // === CI/CD GitHub Actions ===
  { question: "What CI/CD tools have you used in your current role?" },
  { question: "How are you integrating tools like SonarQube, Docker, and Trivy in your pipelines?" },
  { question: "How do you trigger a GitHub Actions workflow in another repository?" },
  { question: "What is the purpose of repository_dispatch in GitHub Actions?" },
  { question: "How would you trigger a CI/CD pipeline in Repo A from changes in Repo B?" }
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

