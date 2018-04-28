/**
 * 公共方法
 */
export const isLegalImg = (vm, file, cb) => {
    let format = ['png', 'jpg', 'jpeg'];
    let index = file.name.lastIndexOf('.');
    let suffix = file.name.substring(index + 1);
    if (format.indexOf(suffix) === -1) {
        vm.$alert('只能上传png/jpg/jpeg文件', {
            type: 'warning'
        });
        return false;
    } else if (file.size > 2 * 1024 * 1024) {
        vm.$alert(`文件需限制在2M以内, 当前文件大小${(file.size / 1024 / 1024).toFixed(2)}M`, {
            type: 'warning'
        });
        return false;
    } else {
        // cb&&cb.success()
        return true;
    }
};