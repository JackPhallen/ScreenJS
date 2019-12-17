

class PageState extends State {
    constructor(pageList) {
        super(null);
        this.index = 0;
        this.pageList = pageList;
        this.state = this.getPage(this.index);
    }

    getPage(index) {
        return this.pageList[index];
    }

    incPage() {
        this.index++;
        super.updateState(this.getPage(this.index));
    }

    decPage() {
        this.index--;
        super.updateState(this.getPage(this.index));
    }


}
