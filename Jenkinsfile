pipeline {
    agent any
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
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
                echo 'Deploy to AWS CloudFormation by serverless'
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
