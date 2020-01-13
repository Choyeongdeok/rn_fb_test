# daily_working

하이퍼레저 패브릭, React-Native를 기반으로 구현한 인력관리 App

일용직은 두 가지 단점을 가지고 있다. 첫 번째, 이른 새벽에 인력사무소로 출근해도 일자리를 보장받을 수 없다.
당일에 일할 곳을 구하지 못하면 집으로 향해야 한다.
두 번째, 인력사무소에서 떼어 먹는 10%의 수수료이다. 사무소에 따라 10%이상 가져가는 곳도 있다. 법적으로는 4%를 수수료로 내게 되어있지만,
일용직이라는 특성 상 4%를 보장받지 못한다.


구현한 앱의 구조
-----------

1. 기업회원, 구직회원 회원가입 후 로그인(앱은 '메인, qr코드 촬영, 마이페이지, 더보기' 총 네 개의 페이지로 구성)

2. 각 회원은 마이페이지에서 본인의 전자서명을 저장
-----------
3. 기업회원은 더보기 페이지에서 구인등록 양식을 작성

4. 구인등록 양식 작성과 동시에 다음 단계로 넘어가서 전자근로계약서 양식을 작성
(전자근로계약서가 없으면 위법으로 간주해서 구인등록 글을 표시하지 않음)

5. 전자근로계약서까지 작성을 마치면 메인페이지 게시판에 본인이 작성한 구인 등록글이 나타남
-----------
6. 구직회원은 메인페이지 게시판에서 본인이 원하는 지역(시, 도)를 선택하여 구인 글을 조회한 후 신청
-----------
7. 기업회원은 더보기 페이지 -> 신청자 조회 페이지에서 본인이 등록한 구인 글의 신청자 목록을 조회 가능

8. 신청자 목록에서 희망하는 인원 수만큼 체크하여 선택 완료 버튼을 클릭(구인 글에 썼던 인원 수와 맞지 않으면 선택 불가)

9. 작성해둔 전자근로계약서 양식을 선택된 구직회원들에게 전송
-----------
10. 구직회원은 마이페이지에서 전자근로계약서 양식을 조회

11. 전자근로계약서 양식에 기업회원과 구직회원 본인의 전자서명이 추가되어 전자근로계약서 작성

12. 저장 버튼을 누름과 동시에 해당 이미지의 uri가 서버를 통해 블록체인에 저장되어 전자근로계약서의 위, 변조를 방지

13. 구직회원은 출근하여 qr코드를 촬영하면 출, 퇴근 시간이 Firebase 데이터베이스에 저장되어 출퇴근 기록 조회 가능

------------
Screenshot
------------

<div>
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256343-4d44f280-364c-11ea-8999-ec4758c815fd.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256513-b9275b00-364c-11ea-9162-3eb2b969d726.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256599-ed9b1700-364c-11ea-8b38-1d68800e479f.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256620-f68be880-364c-11ea-9761-aced0aed5131.jpg">
  </div>
<br/><br/><br/><br/><br/>  
  <div>
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256643-00ade700-364d-11ea-97c4-e4860efa9c9d.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256655-0a374f00-364d-11ea-8ecf-58b50421ed81.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256675-14594d80-364d-11ea-8241-3fa914fffe78.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256688-1cb18880-364d-11ea-94a2-c994ee3207c0.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256709-289d4a80-364d-11ea-984e-fbc5e0c2cee8.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256718-32bf4900-364d-11ea-8811-3b8913763cd4.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256734-3eab0b00-364d-11ea-8f15-c9378c2607b5.jpg">
</div>
<br/><br/><br/><br/><br/>
<div>
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256746-479bdc80-364d-11ea-9a53-99ef5face3e4.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256770-55e9f880-364d-11ea-8ec2-8981cb70659d.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256784-639f7e00-364d-11ea-9738-021b8b3fff0a.jpg">
  </div>
  <br/><br/><br/><br/><br/>
  <div>
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256785-64381480-364d-11ea-9975-a6a0c8a8f020.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256786-64381480-364d-11ea-817b-a6a91027bcd6.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256787-64381480-364d-11ea-91e9-357fa054fa88.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256788-64381480-364d-11ea-8d8a-615f345af666.jpg">
  </div>
  <br/><br/><br/><br/><br/>
  <div>
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256789-64d0ab00-364d-11ea-8435-a09205f917c2.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256790-64d0ab00-364d-11ea-87cd-54feeec6988a.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256791-64d0ab00-364d-11ea-84ce-dd80bf6408ec.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256792-64d0ab00-364d-11ea-9ba8-2c0e6850305a.jpg">
  </div>
  <br/><br/><br/><br/><br/>
  <div>
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256793-65694180-364d-11ea-821d-9d542fc7dd19.jpg">
<img width="200" height ="300" src = "https://user-images.githubusercontent.com/54658590/72256794-65694180-364d-11ea-9bd0-80cd3fa107d2.jpg">
  </div>
