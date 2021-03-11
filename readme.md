## pozigo 🍞

### Resume

The idea of this project was to upload a csv file that contained user data. Please note that their [data is fake](https://fakerapi.it/en/fake-data-download) and for testing purposes you have the file `list.csv` to experiment with the project.

After uploading the csv file, the buffer obtained through the multer is used and sent to the microservice, which in turn creates a stream that [parses](https://github.com/adaltas/node-csv-parse) the data inside the file.