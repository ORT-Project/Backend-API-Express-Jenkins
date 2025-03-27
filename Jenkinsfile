pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/ORT-Project/Backend-API-Express-Jenkins',
                        credentialsId: 'github-credentials'
                    ]]
                ])
            }
        }
        stage('Build') {
                    steps {
                        sh 'docker build -t backend-api-express .'
                    }
                }
        stage('Test') {
            steps {
                 sh 'npm install --save-dev mocha'
                 sh 'npm run test'
            }
        }
        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                    sh 'docker tag backend-api-express-jenkins BluedyRimuru/backend-api:latest'
                    sh 'docker push BluedyRimuru/backend-api:latest'
                }
            }
        }
    }
}
