"use strict";

const linkExtractor = require("../../lib/linkExtractor");

describe("link extractor", () => {

  it("should extract links from Google alerts", () => {
    const googleItem = {
      link: "https://www.google.com/url?rct=j&amp;sa=t&amp;url=https://themerkle.com/what-is-mimblewimble/&ct=ga&amp;cd=CAIyGjlkMjI1NjUyODE3ODFjMDQ6Y29tOmVuOlVT&amp;usg=AFQjCNEry-l2JBWDDO0Kdry0zuBH5m29mg"
    };

    const link = linkExtractor(googleItem);
    link.should.be.ok;
    link.should.eql("https://themerkle.com/what-is-mimblewimble/");
  });

  it("should extract links from Talkwalker alerts", () => {
    const talkwalkerItem = {
      link: "https://themerkle.com/what-is-mimblewimble/"
    };

    const link = linkExtractor(talkwalkerItem);
    link.should.be.ok;
    link.should.eql("https://themerkle.com/what-is-mimblewimble/");
  });
});
