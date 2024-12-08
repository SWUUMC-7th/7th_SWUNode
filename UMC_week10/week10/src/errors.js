export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class ReviewCreationError extends Error {
    errorCode = "R001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  export class StoreCreationError extends Error {
    errorCode = "S001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class MissionCreationError extends Error {
    errorCode = "M001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  //데이터베이스 서버 오류 추가