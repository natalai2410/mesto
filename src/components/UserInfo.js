export default class UserInfo {
    constructor(nameSelector, jobSelector, imgSelector) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;

        this._name = document.querySelector(this._nameSelector);
        this._job = document.querySelector(this._jobSelector);


        this._imgSelector = imgSelector;
        this._avatar = document.querySelector(this._imgSelector);
    }

    setUserInfo({name, job,  avatar,  _id}) {
        this._name.textContent = name;
        this._job.textContent = job;
        this._avatar.src = avatar;

        this._id = _id;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent,
        };
    }

    getId() {
        return this._id;
    }
}