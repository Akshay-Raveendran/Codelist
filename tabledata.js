exports.getData = (req, res) => {
  datas.find((err, docs) => {
    if (err) { return next(err); }
    if (docs != null){
     console.log(docs)
    
    
    }
 
 });
};