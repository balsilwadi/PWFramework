# Project Web API

## Run tests

Open terminal and use the below command for a 
    given environment (example: crate_us_qa)
    and test (example: @Api)
    and data set (example: @CrateUS)

## By Environment, Test and Data Set
Pass the Environment, Test the Data Set to use

npm run cucumber:report:crate_us_qa --test="@Api and @CrateUS"
                        -----------         -------     --------
                        environment         test        data set


## Tests / Tags

### @Api
Runs all Web API feture sets

### @ApiBrowsePath, @ApiBrowseProduct, . . .@Api<TeamName>
Runs all Web API feature sets by agile team name

### @ApiPing, @ApiFamily, . . . @Api<ActionName>
Runs the feature sets for the action name


## Web API Regression Testing
To regression test all 4 Web API sites run:

npm run cucumber:report:crate_us_qa --test="@Api and @CrateUS"
npm run cucumber:report:cb2_us_qa --test="@Api and @CB2US"
npm run cucumber:report:crate_ca_qa --test="@Api and @CrateCA"
npm run cucumber:report:cb2_ca_qa --test="@Api and @CB2CA"


## Web API Smoke Testing
@Smoke tests will validate that the IDs used as examples are still valid for the given environment
To smoke test the data on all 4 Web API sites run:

npm run cucumber:report:crate_us_qa --test="@Api and @Smoke and @CrateUS"
npm run cucumber:report:cb2_us_qa --test="@Api and @Smoke and @CB2US"
npm run cucumber:report:crate_ca_qa --test="@Api and @Smoke and @CrateCA"
npm run cucumber:report:cb2_ca_qa --test="@Api and @Smoke and @CB2CA"


#  Uber Solution

## Shared Actions
C:\Git\uber\CommonOAuthAPI\handlers\Common\API\CrateAPIModule.cs

### Ping
C:\Git\uber\CommonOAuthAPI\handlers\Common\API\HealthCheckStatisticsRecorder.cs

## Shared Models

C:\Git\uber\CommonOAuthAPI\handlers\Common\API\Category.cs