pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Check required dependencies'
                bat 'npm install -g serverless'  // Install serverless globally
                bat 'npm -v'
                bat 'node -v'
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
