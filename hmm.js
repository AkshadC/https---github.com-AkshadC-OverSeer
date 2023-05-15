var individual = [];
    for (var i = 0; i < parsedData1.length; i++) {
      var ele = parsedData1[i];
      var countMap = { "HPC": 0, "EL5": 0, "EL6": 0, "DL": 0 };
      for (var j = 0; j < ele.length; j++) {

        if (Array.isArray(ele[j])) {
          var element = ele[j];

          for (var k = 0; k < element.length; k++) {
            var subElement = element[k];

            if (subElement != "NA") {
              countMap[subElement] = (countMap[subElement] || 0) + 1;
            };
          }
        }
      }
      individual.push(countMap);
    }

    var final = [];
    for (var i = 0; i < individual.length; i++) {

      var ele = individual[i];
      var res = "-- ";
      for (var key in ele) {
        if (ele.hasOwnProperty(key)) {

          var value = ele[key];

          for (var subject in subMap) {

            var total = subMap[subject];
            if (key === subject) {
              res = res + key + ': ' + (value / total) * 100 + "% --";
            }
          }
        }
      }
      final.push(res);
    }

    for (var i = 0; i < parsedData1.length; i++) {
      parsedData1[i].push(final[i]);
    }
    for (let i = 0; i < parsedData1.length; i++) {
      parsedData1[i] = parsedData1[i].splice(0, 1).concat(parsedData1[i].splice(-1));
    }

    const head = ["OVERSEER", "ATTENDANCE % For the Given Range"]

    parsedData1.unshift(head);
    const parsedObject = Papa.parse(Papa.unparse(parsedData1));