export class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }
    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            job: this._job.textContent
        }
        return userInfo;
    }
    setUserInfo(formInputInfo) {
        this._name.textContent = formInputInfo.name;
        this._job.textContent = formInputInfo.job;
    }
}