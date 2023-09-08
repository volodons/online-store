class UrlParamsHandler {
  constructor() {
    this.queryParams = new URLSearchParams(window.location.search);
    this.selectedName = null;
    this.selectedCompany = null;
    this.selectedPrice = null;
    const nameFilter = this.queryParams.get("name");
    const companyFilter = this.queryParams.get("company");
    const priceFilter = this.queryParams.get("price");
    if (nameFilter) {
      this.selectedName = nameFilter;
    }
    if (companyFilter) {
      this.selectedCompany = companyFilter;
    }
    if (priceFilter) {
      this.selectedPrice = priceFilter;
    }
  }

  updateUrlParams() {
    if (this.selectedName) {
      this.queryParams.set("name", this.selectedName);
    } else {
      this.queryParams.delete("name");
    }
    if (this.selectedCompany) {
      this.queryParams.set("company", this.selectedCompany);
    } else {
      this.queryParams.delete("company");
    }
    if (this.selectedPrice) {
      this.queryParams.set("price", this.selectedPrice);
    } else {
      this.queryParams.delete("price");
    }
    window.history.replaceState(null, null, `?${this.queryParams.toString()}`);
  }
}

const urlParamsHandler = new UrlParamsHandler();

export { urlParamsHandler };
