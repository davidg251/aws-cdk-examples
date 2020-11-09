ACCOUNT=$$(aws sts get-caller-identity --query Account --output text)
REGION=us-east-2
deploy:
	echo ${ACCOUNT}
	cdk bootstrap aws://${ACCOUNT}/${REGION}
	cdk deploy