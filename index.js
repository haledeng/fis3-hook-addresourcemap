/*
* html 中添加resourcesMap
 */

var _ = fis.util;

module.exports = function(fis, opts) {
    fis.on('release:end', function(ret) {
        var files = ret.src,
            content,
            ext;
        _.map(files, function(subpath, file) {
            ext = _.ext(file.toString());

            if(file.isHtmlLike && ext.dirname === fis.project.getProjectPath()) {
                content = file.getContent();
                file.setContent(content.replace('<script>','<script type="text/javascript">\r\nvar resourceMap = ' + JSON.stringify(ret.map, null, file.optimizer ? null : 4) + '\r\n</script>\r\n' +  '$&'));
            }
        });
    });
    
};