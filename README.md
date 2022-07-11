# receipt-printer
To develop this project the following premises were considered:

- To classify the basket itens (food, medicine, ...) only the descriptions in the files from `test-inputs` were considered;
- For input data, default command-line tools would be used;
- It could be entered multiple shopping baskets.

Use the following command to run the application ([Node.js](https://nodejs.org/en/download/) must be instaled in the machine):

```
node main.js
```

For test purposes, the application also can get data from the test-files and calculate one shooping basket. To do this, use the following command (**it only works on Linux command line**):

```
node main.js < test-inputs/note-input-3.txt
```