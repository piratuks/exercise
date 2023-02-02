# Swagger-UI:

http://localhost:10000/swagger-ui/#/

# H2 Console
	
http://localhost:10000/h2-console
	
	
# Requirements BE:
Maven <br />
Spring Boot v2.7.3 <br />
Java 17 <br />
	
# Requirements BE:
Node 14.16 <br />

# Frontend
http://localhost:10001	 <br />

# Notes	
I am assuming that estimated points are followed by fibonacci sequence. <br />

I also assume that issues/stories will not have more than 8 story points 
(meaning if story is 13, 21 and etc then i assume it is splitted to smaller peaces durring backlog refinement to fall bellow 10).
The reason is because in the planing functionality it is said developer completes 10 points per week and week points cannot go above dev_count*10.
So the following examples are not fitting within this functionality:
	1. We have 3 developers. Also we have a story with 21 story points and two stories with 8. 
	This results one developer taking a story 21 points (if we assume that he will complete 10 points of this story per week then it takes him 2+ weeks to do it)
	Second developer taking one story with 8 points and last is without story because that would exceed limit.
	2. if we have one developer and one story with 21 points then it also exceeds limit and therefore developer is without task.  <br /><br />
	
I also assume that max working days per week are 5. This means that each working day developer on average completes 2 story points <br />




	
