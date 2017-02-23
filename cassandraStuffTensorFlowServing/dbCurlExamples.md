1. Add Model

curl -F modelID="3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d" -F description="testDescription" -F modelPath="/test/path" -F paper_link="testLink" -F tags="tag1,tag2" -F developer_username="testUsername" deepc05.acis.ufl.edu:7070/addModel

2. Get Model 

curl -F modelID="3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d" deepc05.acis.ufl.edu:7070/getModel

3. Add Review 

curl -F modelID="3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d" -F reviewer_username="sjs" -F review="this is my review" deepc05.acis.ufl.edu:7070/addReview

4. Get Reviews 

curl  deepc05.acis.ufl.edu:7070/getReviews?modelID=3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d
