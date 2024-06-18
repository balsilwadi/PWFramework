# Browse Data

## Confluence

Browse Data: https://crateandbarrel.atlassian.net/l/cp/PeaHuwCV

## VERY Temporary Data Source

https://docs.google.com/spreadsheets/d/1eChbtqIi_bM4m0Y2z1KMVDtdoaRq8VRUWVPsTvMVGe8/edit?usp=sharing 

### Calling these stored procs

EXECUTE [CRATE_Analysis].[dbo].[OnceOver_CrateUsaQA] @top = 5, @environmentPrefix = 'qa-', @pageGroup = '', @weekspast = 6, @excludeDomain = 1

EXECUTE [CB2_Analysis].[dbo].[OnceOver_Cb2UsaQA] @top = 5, @environmentPrefix = 'qa-', @pageGroup = '', @weekspast = 6, @excludeDomain = 1


EXECUTE [CRATE_Analysis].[dbo].[OnceOver_CrateCanQA] @top = 5, @environmentPrefix = 'qa-', @pageGroup = '', @weekspast = 6, @excludeDomain = 1

EXECUTE [CB2_Analysis].[dbo].[OnceOver_Cb2CanQA] @top = 5, @environmentPrefix = 'qa-', @pageGroup = '', @weekspast = 6, @excludeDomain = 1
