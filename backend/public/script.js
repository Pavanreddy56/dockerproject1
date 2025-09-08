fetch("http://localhost:5000/api/quiz", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "DevOps Quiz",
    questions: [
      { question: "Which tool is commonly used for container orchestration?", options: ["Ansible","Kubernetes","Jenkins","Terraform"], answer: "Kubernetes" },
      { question: "Which command lists running Docker containers?", options: ["docker ps","docker images","docker run","docker build"], answer: "docker ps" },
      { question: "Which service is used for object storage in AWS?", options: ["EC2","S3","Lambda","RDS"], answer: "S3" },
      { question: "What does CI in CI/CD stand for?", options: ["Code Integrate","Continuous Integration","Container Instance","Continuous Ingest"], answer: "Continuous Integration" },
      { question: "Which tool is used for configuration management (agentless)?", options: ["Chef","Puppet","Ansible","Kubernetes"], answer: "Ansible" }
    ],
    score: 5
  })
});
