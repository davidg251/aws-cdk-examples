import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export class CloudfrontDistributionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const website_bucket = new s3.Bucket( this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    });

    const website_oai = new cloudfront.OriginAccessIdentity(this, 'WebsiteOAI',{});

    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset('website/')],
      destinationBucket: website_bucket
    });

    new cloudfront.CloudFrontWebDistribution( this, 'WebsiteDistribution', {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: website_bucket,
          originAccessIdentity: website_oai
        },
        behaviors: [{ isDefaultBehavior: true}]
      }]
    });
  
  }
}
