const filterObj = (req,res,next)=>{
    let filterObj = {};
    if(req.params.categoryId) filterObj = {category: req.params.categoryId};
    req.filterObj = filterObj;
    next();
}
module.exports = filterObj;