pipeline {
    agent any
    
    environment {
        SERVERLESS_ACCESS_TOKEN = credentials('SERVERLESS_ACCESS_TOKEN') // Serverless auth token
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/pooyafo/http-api.git'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Check required dependencies'
                bat 'npm install aws-sdk'
            }
        }

        stage('Test') {
            steps {
                echo 'Stage 2: Unit and Integration Tests'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Login to Serverless Framework'
                // Simulate serverless login by passing the token
                bat 'echo {\"users\":{\"<user_id>\":{\"dashboard\":{\"accessToken\":\"%SERVERLESS_ACCESS_TOKEN%\"}}}} > %USERPROFILE%\\.serverlessrc'
                
                echo 'Deploy to AWS using Serverless'
                bat 'serverless deploy'
            }
        }

        stage('Release') {
            steps {
                echo 'Stage 4: Deploy to Production'
            }
        }
    }
}
