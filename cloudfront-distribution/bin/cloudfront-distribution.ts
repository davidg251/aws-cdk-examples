#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CloudfrontDistributionStack } from '../lib/cloudfront-distribution-stack';

const app = new cdk.App();
new CloudfrontDistributionStack(app, 'CloudfrontDistributionStack');
