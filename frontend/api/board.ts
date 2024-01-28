import Board from "@/interfaces/board";
import { BoardType } from "@/interfaces/boardType";
import Comment from "@/interfaces/comment";

export interface PageOptions {
  page: number;
  count: number;
}

export interface Response {
  contents: BoardList[];
  total: number;
}

export interface BoardList {
  boardId: number;
  boardType: number;
  userId: number;
  username: string;
  title: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  solved?: boolean;
  commentTotal: number;
  likeTotal: number;
  createdTime: string;
}

export const getRecommendPosts = async (): Promise<BoardList[]> => {
  return [
    {
      boardId: 2231,
      boardType: 2,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      thumbnail:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVEhISERISEREREQ8PDxEREREPERAPGBQZGRgUGBgcIS4lHB4rHxgYJjgmLC8/NTU1GiQ7QDszPy40NTEBDAwMEA8QGhISHDEhGiE0NDU0MTQ0NDQxNDE0NDE0NDQ0MTQ0NDQ0NDQ0NDcxNDE0NDE0NDQxMTQxNDE0MTUxOv/AABEIAL4BCQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//EADsQAAIBAgMFBgMHAgYDAAAAAAECAAMRBBIhBRMxQVEiUmGBkZIGMnEUQmKhscHRcvAVI1OCouEWM/H/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAiEQEBAAIDAQACAwEBAAAAAAAAAQIRAyExEgRBMlFSQiL/2gAMAwEAAhEDEQA/APQhJGWMZZVknoOIHKIVElStpdTGiiASGaQXlC0egtmkiUBhUiNBSDalGwshhHsaINSkCnGmWVKQ2WgQsMiytpYRGhoBzGssG6xwqUhEEkpCIkZICyGMKVgWEAgv4zg0pacDDQ2KonPTkK0uDAy7UzKEER0iBdY5SsBVoVJXJLKsKJFwZVmnNFqrxC1LPOzxbMTzhUWVotpYXkZIZFhcoi2ejkpUe0uYvWMiLoL1JZHMAQbwqNKSISZAM7NIgBUMKrxTNaQakWhs+asrvYkKsMhhotmVaWMoghbRKBKyQIQypEA4QbiEg2MAGwlkScDCpAkWlCIVhBNA1Sold3LAyS8ZAlJ17Q1pRljJAecRIyycsDVNpWQ+kA1SBbHMBVWXR7w+7vHOhe2ZljNBYU0fCEp07QtEjssm0NaVtJ2ehMwg2W8XFSFpvFpe0OkzcZj0plQ1yWuQAL2HUzVqTxOPxIetUvcBWyjloulvyMnLL5gww+q9VhsYj/K4v3ToYzaeJpt5+diI7htpVEIAa68lcX/XUSZyb9XeL+nqckjdRHCbZQ2DqaZ6jtL/ADNmiVcXRgw6g3mkyjK42elRSjCIJZ0tKBo9lrQ4EnLBI8MjxHEZZVhCloJzA1CZBkGQBBKygQqmAMspj0F3eAYy7GDvDRKkwbPCNFa9QKCzEKo1LHQARgdastmnnMT8QKt8i3tpma/6Dz5xVPiN+dNPDV1vFuC9evXB4QGef2VttKzFLZHFzlvmBA5gzaDxh1WJOI07wB1jhV1IxxWiyJCiKiCM0shijPLo8NHsy5gs8qzSkWj2A6kGHoAzmFzD0UhQKU0mHj9gUnZmKlXYlmZGIuetuE3ywgHN4tb9V9WePHYnYNRNaTBx3T2X/gzNauyHLUVlPCzrY/nxnvikFiMOjrldFdejAH06TPLil86aY81/67ePpVwdeJ6HXT9Y5RxeXVCyHjcG35j94zjPhlDrRc0zxCtd08uYmTicLWo/OhK99e2n1vy85nccsWkyxyegobecaOA46/K1v0j+Hx6P8h8m0M8bRrjrb94+tbQKvHnpwlY8n9llxS+PXI0aQzzeGxRVRZjoDe+oPlHcPthTo/ZPUaj0mv1KxuFjbzSpi1OoG1Uhh1BvC3jS5lkEzs0qzwJBMpnkO8EHlQqNFMcawF6Ipk8w+cE/Qg2jSNLkwN5PE7WxqE58NcDnTUNp6mZuN23Uqpkem6WOZT2F7Xj2tZ7lmmZtRlNkvldQame+Uoo04+Mw5N4zcrbj1llrTwFQgX1U5kYIN4qPnA+c3bKRxMjBbPdwM9ZFY/dDO7E8bnSw8p60Phqgy4gU2Nyi1MgV7d7MB4TzWNpojtu3chWazsFsQD93w0nPM5/r1vlhf8+H9nbMrU3WvQvV3bZXS6AspGtrn6flPZo91BsVuAcrCzL4EdZ82w2NroSEr5QTohLFT534zW2Ztmsrg1Cro1g2RiNBxOU8GnRx5XHq9sM8Zl3OnsWeXQwSkMAwNwwBBHAiTe06XOZlS0UfEWkJiRFobMkXl0W0GtQGSHERjybQavLZ4G4GFUwRM7NALO8CGlit4RaUAreVYwpWRki2LAluYdKZkoto0hhTjGxmwKT3OTdsfvJ2SfqOBmTX2JVpZmUrVQDWwK1AB+Hn5Ge0lGmdwlXM8sXzhcToRmse1+pkpiD/ANgz2+L2dSqX3lNGJ5kWb1GsxMZ8MLxpVGQ8lYZ19eImd48p40nLjfSGHxRGqsQfDQzUw22WFg9m/wCLfwZh4nZ9anfPTLIPv0+2LeIGoiqYq/A3H5wmWWJ3HHJ7ZNoI/A2PRtIUsZ42liPG37R/D4904NpxseFv0mmPJGWXFZ432g7xWntZTo4ynrGVdW+Ug/r6TXHKVlljYYR5YmLK0KrR0SpKzye0K5+0VfA5bHootPXIZ5L4hohK7vluHVXB6NqDOL8zfxNf27Pw7Pu7/ojiWFhwN78Dw8vKI1lubcjwPG/lGHYhczAlLi1hxNhAq13DWso+UTzJdXb1MpuaZtXCupNvHUDgbcYOjiSvzX4gOLc+s3KQDkg2tw16eMzNq4MoxYgAHgQbg6cTbxndw8311fXBz8Px3PHpvhfH5g1O+ls6C97a9q36/wB6+hPCfOfh3EFMTSPFWIXQgjtXX959NSncTv47/wCXBnO9xl4m8BSOs2K2FuIi2HsZrtnoalLkwSCWERjI0JeDVJ2WIxWlQ0YFPSL1NJMp2GaDRoTLR7GNpVMLDlWqmUQyziDywgphZcGCSWYxEJvJUvBZpNryguGlhaCtJEWhtZxMzH7KpVNXpjN317D+o4+c0SYJzFrfpy2ePK4n4fcG9JxUA4I/ZYfRhpM2oXpm1VHQ8iw7J+h4Ge4Es9MMLMAyniGAYHyMjLin66XjzX99vEJiDyNx1GsJSxRHO1ptY34cpNdqd6Tcexqt/wCk/tMTF7KrJrl3ij7yXLW/p4zO45YtZlhl00sPtN+dnHr/ANzSw20Ubich4a6j1nihUIX+m+e5IYAD+9IfCYsOuYAgXIF7A3HiI5y2FeKV7sG+o1HUG4mdtvAGrTun/sS5Ud4Hiv5TCoY10PZZh+/15Ga2G29yqJ/uSwPpzlZXHPG45eVOOOWGUyx/TzGJLKBbW9rg8iBa0VFVjrbQaXnrNq4dK6GpRZTUW7Mmis689Ov8TzFB1JNiNb3AI4zy+Xh+ctPT4ub6x2Up4qzGx15iatOotZCpOpFiNJh46mL3XjK4SoQeNmEzm8buNLrKapzD4BkqXyNZGVrgcuP08PSfUcM4IBHBgGH0Oonzqnii9kGYueyAL6mey2Pii9GmzKyNkCsrAowZdDofpPV/H5LnjdvK/I45hl02HiFdYxvoN9Z0uYmVhKVMmFyQ9NI9hUUp27jF9JTNJ2YAqaQNWrM/7Q0lKhJlfKfo5TOsfprFsNaPoBJqonLAVDDsYu5hDqUeSzykG0ekripCK0UtCpeFglHzSR9JCtDoIGCwgHjrJFqywhUsR4y6vBOJQXlJ2clHAglJ6yykwGy+J2alX50Dfi4MP9w1mVifhVl1oVL2GiVDY/QMB+onpKcZWZ5Y45exrjllj5XzyulSkctWmycgSLqfoeBlUdTztrPfYgAgggMDxBAIPlMDGfD9NiTTvSb8Gq+08PKY3iv6bY80/bzmLci1NblqgKhhbQfe1+hlMJs9ULEAOzrZ1e4B6FbHQjkR+c0cRs2rT4oKii5Dp2iPLiJmJiQiPvDnUucgPbNjqFI8NfSYZY6ttnboxz3JJela2BRioVnUubHMyuq/iBA1HlM7F4RqdTIxXlZgQykHUG40m/hXsMx0Y2uLXAHJfIdIw7Iws6KVPHQMP5ExnD9Td6ta5cvzdTyEvhhAznicnazcgeQE9VmMwNmGnQdmTNkdcrqGzLmB0Ivw9ZvU6qOAUYEHhyM7vx8Zjjr9uD8m3LL6ni6OY1TYxUKY3RE6a54u0qKtpFVrRNq+sWjai1Lzs0Sp1JfPFoM2/hCI3hCkeE5bdJRaMUnEZWraL07SXeTo9mTWnKQYoKwhKdcRaPY7iK1CY1nBgsl45SsAVzGEaVZJAqW5R+l4aW0KreMSz3haYMWj2ZLQFRYZEnOsUMg48JCL4Rl1l0SVtOi+SSojDL4QVxDY0IiyzmQrdIOo5iNVh4zlSANbWESrGWxsomfj9nUqnzoC3fHZf1H7xw1IItJs36qZa8ebxPw863NF8445GsrevAzIru6HK6sjfiFr+fAz6AogcTQVxZ1DA8mAI/OZ5cMvnTXHms97eD3mcgG1zz4TVR7BQDp+doXHfD6nWicjccrXZPLmJk4hKtIdtG0Fs47SnxvMrjli1mWOTYp7SKmwsV6cZqYbaSNoeyfHUes8VSxZ/giNJiR11HqI5y2FeKV7Oo9xpYiJMpvMXD4x14Nccxe0fo7SU6MLHqP4m+PJjWGXHlGhTUw2UymHdW+Vg36+katL2jVXemIIII6VEE6iTKdgYUQbyzNaBerKiaoQDIC2hEYGHWiDHacgSPG6DiAajKobSQecCKPT10hUeGRAYp0L2XpUY7RSQKc69oWnIYywbrB76TnvEYRTWFRJ1pOa0CVqiIu1jGatYRGpUlYpowrQNTEQO8M7PflK0W3LUuYzTgkt0jCkRU4508YEoesu7icpgblBhQsuolahAgAnQReoBK169ojVxUcibQMZs2k9+wEbv07Ib9TyPnMSv8OMrF6ZFTrrkc/sZuo1zwj9CnM8uLHL9Lx5csf28USyNZ8yHuuCpH0h6dfTUjzHH+Z6/E4VXGV1Vx0YA/8AyYWL+HxqaTlPwt2l8jxH5zHLhyn8e3RjzY3+XQFGpbUG1uGsb/xB++3vMx6uHq0vnQhe8O0nqOEr9pH9mZ/WU6afON7fRHe0CXi61CYZUM7HErUMXZoy6GLstuUcFQrWjlOtFL+EsjHpCwSn73lHQTqTQxUGT4Cd7c41QqDrF6qdIAm0r0NsOIGrM9K/jL72/OTofSzHxl6bwYXxlwQIxKcUylR7QG/A5yjYhTFJTtijvIAHSEVlh0tGRUqOkgDwjxQQZTwj2WgVt0klLyxtLKRAy5pQiLaHFpawitEgeYxWu5jFU24RCpUMcKlKwMVFM3mlr0lDpxEotK4emBxjoIESbEKJT7UDAHmcdYFiOsArg84daI6xBItB/Zk/009iwmQDnJ06xKM0sJDmgRJw1YcyI2WBHETO5Xa/mWMtiRF6pMdxKeMSNM9ZcTQd4YZHPSVZJTPbnGk4HMgV/GA3vjBO/iPWB1oA35wVSleCo1I1nFtYeD0luvGMUaI6yrlb8YWi69RHstGVpiCrACFNUW4j1ieJxK+HrJh0B2EGCsE+IU85ClT94S0GkeMI5itOkDzHrHaFHxiqoaoMYZ2nU0nVRpI2rRHEOIuGPWWxFPXjBJS8ZX6TTKE9YbeWgQlpR2h6rxZ3JgGQw6AdZc26iCb2VF+ko4vxjDVQOYgd+vUesCJ1KY6QYVRNBgD0itaw5SicjqIwlZZk1cQLw2FsxgbQax5yMg6w9PDgawmRZKn0rcL3F9ok7pe6vtEvOnlvQ0puV7q+0SNwvdX0EJOgNBbhe6vtE7cJ3F9ohp0NjQO4TuL7RO3CdxfaIadDY0DuE7i+0TtyncT2rDSDDZ6ZS7Rw5bJenrTFVWIUKyEvwP8AsY/SdiNo4dGysUzABiAmawuo5D8a+sinsKkFKnMQwUEFgBZWYgAKAAO22gE7/BU79Qs2a7EpcnsWPy203aW05a3hsaFbGYcEgvRBDZCDlHa10/4t7T0MH9vw92Gan2URySoAyuWVbaaklTpJp7Gpq2YXvmd10p9kuGB+7qP8xjY39NJWnsVEy5XqKVyBWDJdSGqEEDLYW3ji1rWa1tBY2WlqmMw6kD/LNyASoUqoKF8zHgBlF/MdYarVoKbNulOTeWIUEJr2j0Gh9DF//H6OQU+3ugwdaebsq4TKGBtmvz48dYWpstWLMXqXcKG1XUo5ZD8vFSdPK94bGlWx2GFr1KAuMwvkGmuv5H2noY3UVVUtkDZRfKqAsfADrEDsKkVN8xz52Y5rFi61FZjYWuRVf1HSPVsIGVwLo1RMjVKdlqZRe1mtyubdLmGz0RTadMlBu2AqM6XKIFR0LhlPa1sUbVbgWuSAQZw2nSKo4pOVepug+7UKrGoKak3N7MzC1rmxva0sdj02VEcvUSmMoptkyMBmAuoUAWDEaWuLXvJbZKAoULIFqPUCLkKM78bhgeWlxqATbjDY0oNpUTchCw+0Lhgwp3U1GC2YHu9odrnyvKDa1EisVpM25JzhVp/KM921aygZG0ax4aai5hsamqlad6SmpTrEU8oGZAoUAEEADIukGdhU7NZ6i5ipNinBGdglipDDM7HtXPDWGxqCfbkO8CUnY0hTZhu1p3VwSGUuVBAsbxnClalNagp5Q6q4V1UMARcXAvrBPs0Mahd3YVkppUBKWKry0Ucbtf8AqPhbRhstA7he4vtE7cL3F9ohp0NjQO4TuL7RO+zr3E9ohp0NjQW4Xur7RO3CdxfaIWdDY0B9mT/TT2rJFBO4vtENOhsaC3K91faJ24Xur7RCzobGn//Z",
      commentTotal: 20,
      likeTotal: 30,
      tags: ["질문", "Java", "피보나치 수"],
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2232,
      boardType: 1,
      userId: 1,
      username: "암튼 긴 닉네임",
      title:
        "이것은 정말 긴 제목입니다. 아주 긴 제목이지요. 무엇보다 다른 것보다 깁니다.",
      content:
        "이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다.이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다.이것은 긴 내용입니다.",
      thumbnail:
        "https://www.birds.cornell.edu/home/wp-content/uploads/2023/09/334289821-Baltimore_Oriole-Matthew_Plante.jpg",
      tags: ["자유", "C++", "행복한 유치원", "이것은 아주 긴 태그입니다."],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2233,
      boardType: 1,
      userId: 1,
      title: "님들 산타가 언제 쉬는지 암?",
      username: "암튼 긴 닉네임",
      content: "산타 클로스(close) 촤하하하하",
      thumbnail:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgWFRUZGBgYGBgYGBoYGBgYGBkYGBgZGRgZGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQhISs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAJ8BPgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYABwj/xAA4EAACAQIEAwUGBQQCAwAAAAABAgADEQQFITESQVEGYXGBkRMiMqGx8AdCwdHhFFJy8SNiFiRD/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAJBEAAwEAAgMAAgIDAQAAAAAAAAECEQMhEjFBIlETMhRhcQT/2gAMAwEAAhEDEQA/APK2WKoj22jKckOyZUiusRWiu0xgdUJM1fZ3s+tYEsbAbk7HwA/eZi01XZDH2b2ZO+0Wm0uh4SdJMv27G4Uj4mB7r/vA6v4fUzqlcjpddPOaIGJ7e3OSXIzqfBL+GTq/h9VHwVUb1H1kP/huKT8it/i15sjiDOTFnrab+QH+Mvhg8RlVZPjpsPIwQ0p6auPcbsGHQiMrU8NU+NAG7raxlaEr/wA9fOzzI0ooS01WedmmUGrQuy/mQDUDqvXwmUdzqI+oi4aeMidpGzGKzGLvCKIrmcWMdOEXR86GqpjjeE0gJzqIRCBWMlVjFCiT0kEGhwjIMia8NdRI2piEAGLxWcycJHUsKznhUFidgBczGQmHeSewdzwopY9FBJ+U1OU9kDYPiDwi1+Ab+Z5S+WrTpLw0UVR1GpPiYrpIvPFVGay7stVABqFaY7zdvQSzbIcPs7u/h7ok9XEM2pN4OKjcrxPL9F54F9JaWW4RNVoJfqwufnvC1xKj4FUeCgQFZKiGbyYf45XwIeqeZlZ7W7G0kzGrwpfmdBBsEhtvCRt94GI+kscO+krimoljh0ERezV6B8Y5llldO8Aeldpe5XSAEfNJJ4xuNpaR+CpbyfGkRmFYC8hUpM6Zps+eXadTMRp1OdpwsnURzjSNQx7bTGIrybCVuBww0seUgiiYx6pgK3Git1G/U7GTGjKvsdUL0N78LW+W3ymjGHO853OPD0YrZTADStIwnWHuh6SB07orRVUB6X3imr93jcQtu6CAHrEbKJaXWX5iENr3U790XPOzFLEjjSyOR8Q2b/IfrKUAgzQ5FijYoeWo8JSKa6ZHl4lS080zPI61FrOvmDvK2xGhnuuKwiVEswB8Zk817HK/vJoefdqP5nQedcuWebXiqZqanYquB7tiwOo20O1jzkuF7CYlrX4Vv1N7eNouB3oy6mKTPQU/Dpba1jfTZfWTU/w9pWuajnyUfpCKebgwik031X8PKdvdquDy4gpF5XP2DrKdHQi+u4Pp/MCQzfRknacgJ0AJM19HsS9/ffbU8Ox3tb5S/wAq7MIlja5X3tevKZsVTplMq7Lu5BckDu59022W5PSw6+6uvMnU+ssadMIIFj6hPlEbOnj40uyuzLFkmw2EqWc84TW6QZgRsJKmdcoWk5O4hHCJFQ1O94bSpg8rQyCmRIkkRLQ+nSFto16dvCPhJ0Z3Ojqo+/vSPwxAEjzXWrYcgJPTTSFnLu02SB9RLTDt3SuoUiTLKmhAiSuylPojJ96XmX7Shc+9L/LzoI5HeyLMW0jMEQRJs1AsYHlx0MhyPC0vDwhUjjTkSPJDUnccg5RHkRiPHu4tMYYEihJF7WOFaYBtewGIs7p/ctx4g/yZ6EFnj/ZzMfZ10Y7XsfA6frPV1e+oOndJV0zs4Hs4TOg5yKrR6C8VBfnONM9YpdFdWom+0CxCAcpaYkMvUyvqVTba/wApKkXnQRiNfWTZfW4WDX+u0ixCKRtYwFcQ1M2YXXrqLa9RAavR6Bha2wlrSTbTuP36SgyK7oGNrciDuJo6CACXmjj5cY7+lGnpHmkB8o+8Xhv9f1jujn8SHhEfwaCKF+/rHlflFMQlPv6TrDXSPYfPX5QUYkXIvf7/ANzabCVqIjGWw+/vpHBtN9eU5msNYXjMuipxbayqxlcDnt9ZeYnnb0A/WZTMfisdO795Olh1RW9EPHxHQecctLqYxD327pMjDpEOhvB6U1ELpKekZSUee8KQ2jJEqYgLbRK76ax5MrM0xXCnedI2E6edlHUfiqk98tKTSppLrLGnDRzoNoNCg2kDopCoqQ1MiO8uMvqaCUrtrLLL6g5mFiYF5k+kjyxRYyHM6y23kWAxigGRtaWlaeFCcIqidO04xSYt9I0mJeEwhjkEbHLAYlBtrPSuyebe0phW+JNNrXHK080VCxsoJJ5Cajs/ldekeM2Qb2O8S1qLcTc10ekUjfnJBKrKsSrrxDfmL7GW6GSTOzV8IXGmsCejeWZ13jHUcoH2PNYU+Jpnh22lYh9/QHeag0tbQd8nBcOCALi4gaCqLfK/hFxbylurnrKuk1o9mLG17D0vCmRc9lsK423kwN5UonDY3/WG03+/GN2Sqf0FIAN45tjIFra23juLWPLTJNEVYEyNcKD6Qq/39+UUHU9w+sGIOkboFFhAKuKA8IbXaVtVlBN+6HApI6q4IuDMpmakVLBd/vaaJ3AHu6c7fxBK1JWPFa52iUikdMpUwvX4rQjDYdyb/Zhi0rHaF00i+Ost5MHo0bbyUrHuIPUqADWPmCjMTUsN7WmMx+ah6lgbgbQjtNnXCpRTa+8xS1je94UiN1vSNemKWG0seswjYpuscuLf+6FomqPQ1zNBEfOF6zz3+qb+4xj4g/3H1gwPkbmtnK9YOnaNV3MxgqHrGs8OA012N7Sq4sCfnA0z+3UzN3jS8HijKmgRTOhLZbWUXNNreEjbDuN1b0MtpEiM60mOGe1+BrdbGRWMxhhhWX4J6zhEW5PoPGWGQ5A+IbogOp6+E9Jy7LaWGQhFANtTzPnEqsHjjdf8KDCZTTwqD81Q7np4SPH4gqjOTy0hVVuNiTzMre0QtR8xJbrOppTPRV5Jnj03vfQnWeiZbmqVFHCRfmL6zx28sMBmjU9QTp00Eap3tEo5fHp+j2EPeTILzE5J2hJtxi1/X06fObHC4lWAIbQyfr2dU1Neg1KHMyHGYpUGm/KR47MERblrWlXgOKqTVYEJ+QHn/wBoBm0vZb4WoXHgYJnuYrh6bVXLFVA91dyb23vpvCspX4rzs0y5K4am4upGtppQulH2S7THEh1KcBUiw4uIEG9tbaHSa3C4nkZQZf2fw+FU+zQgki54iTflv4y8p0jo1tTuNYaa3oVb49+wxKg0Nte7oDJEe3O/8Em330go+/3jlYk/tFVEqkPRxa8cWG4+9JGigjblGvptKrcJtAuNqWExvbPM6tLD8VO/GzWuBcquuvrYazZ1qYO8rKqFGF9QxI9NbekZfi9Yy7WFP2ZxL1MMr1fjKknlpra462tBGzbgezHQ218f9TUCmo25/rMX2oy66e0QWamSHHJkO/mND5QUtYVXiazD11dbyRgJ5rkHaJkAVjddLa+s0mI7RDguo12N+XQ+EGNFPOWtLXG5gqC7GwmOzvtNuq6d/WUub50XvxNY6ixvwnu01UzM1sQSdz63jzP7I3zb0g3E4ouxLG8YrwD2hne0MbCPkGu8QVIFxmLxTYbyDRVjGqwZbk2hTYM2vNhtOFeJ7WCGLebDaFGtIvayKcBNgNPa14TcWHhEfCJbVR6CE06IERlkTqwrKrICFKaeAtB6uUUX14QL90ssTQU6neRLSsDMmK12TZZhUpJZRYRmY4gcJ67SL2lhY8pXYyoWOkODwxtNOcqu0APs2lpSvbXeV/aM/wDCZkjX6ZijOWNUyQGWOQNwNdgevdLwZs6j4mF9zsf47vWZlH744v3xHKY8059Gty53xWJSmWLKAS55BRv9bek31Zgo4RoALDymb7BYQJQarb3qjaHnwrp9by7rsSZC3nSOriTfbLHJhcMf+30EIYkE2kGWLwp4kn79JMq8Rvf784m4h37H0qQZgWNwu/eYYEBPdI6KKNhrJw0eULTB8Re+kbTIvePrLeRqNd/KLnYCwouLRr1D5RiE8hFYHpLprMEqRUN5DXpXB9R4iNAIOnpJXa8PtE8wCYDkLdR384Bi0HGQRcMNR3HQy2e3rAMYgNj5RQnimeYRsNiKlKx4A3En+Lai33yjcNmjgWYctDyI6Ec/Ga/8RcMLUqlv7kJ9CP1mHFpT2RzGR48h24gLXGo74H7Mw8ATmAh0GAPsjO9kYaAI6wm02AApGOFIws2nC02mwhw1P3heaFwnD5SlDCSNXNrXgCA1afvHxjfZGFFp3EIdBgMKRkgpSYNFBmCe0K85owqRrGl9Jz+jrYyqIMgJJ6SeoYjsFWHQNaAYleE3lbXbXSNx+Me5K2IG8Gq4sCxOl4wEsYaiHrKvtDU/4yJY0qotprM72kxFyFHKMjW/xM4ZxMVhElDlFQx5kcLy7DmpVRBqWdR89fleAyPXcnocGHpJtwovqRc/WFrTvH0k2HlCVScb7Z6MdLB4S6cIJG2o36zkaxsTO4uUYw5iZmDEeSU6kEQ6ayRHsI8itE1XWNSyC58pC+IAFz9iUebZ8qAsToNd+UOdjzP1+i+bFE8539QeplLkeYrXpiop0N/UGxBlk7C0KGbXwMo4m5sZM7TC4TtKrueE6BrDvF9xNThcaHA17o6fwjyxq8kTM5H396xlUgrGVYjN7p6xSLMh+IFMnDpblUHoQZ52aRnrXabCe0w7jmo4x4rr+88wbUSkvonS7K8xGMlqJaRkRhDlikxBOmMNvO4pxWdaYwqiI87iiEzGFE60TinBpjD1WOAjQ0cGmMe0obiR8GshwFUkWPKGNOTdO6pwDcC4g+YVOEXi12OsqsyqkoRDNaJ6MnnGZsrKqi4La+EZnbngQrtCzhxc8QvfnaQ5oB7I25S8tdEqT7A8JmbLz0+kjxdTi1MrFjy5j4RdNrGI5jLxZxEIpwM2P4eYANVesf8A5jhX/NxqfIfWYy89J/D5f/WY8zUb5ACJyPJK8K2kbKgYWvjAaJhCtOVHaMZvrHqfv+IPW3vGJiP9TaZBZfSD1K9hGtU6Qe+pm0DJmfj0vKXOOzT1mF34U523k9TFFD3GRV83JG9pWaRZpuV+g/DUqeHprSp6BdfEncnvk2FxYJ1P7TK1cyJJtc+EbRzHxB6GDvdB1mFqOyirV46T2Qm/CeV+Q7pdJT4Of+5T4XNmA3h+Grs+v5R9ekfyTFayf9FqWjeKQluUcg+UXTlaHOtwQdiLes8exqGnUdD+V2HkDp8p7AxnlnbilwYp7bOqt6ix+kpP6J112ACzQatRI2kC1CISmK6xhNTBot4V7pjTRHKbTeLBbxbwtMCTC6eAA3g8kZSyn4T0nFD0l+uFWSHDJN5IPizMmcDNE+XqYDXywjaFMVporbxwaLVosu4jsPQJhAeyrTsbiEhOvORuLx4acuHeysxyWNxKHEk6iajFpcTO4ync2mU4xKKyqxEpc3e1M95lzidN5ms5q3sPOWldkreSVYMcDI5Issc50RjFjWmAdPR+wRthj/m30E84E9R7IoBhE7+InxLGR5v6l+D+xe+2sbwpK8rmaIrlZzadrks3NxpBaiyJcTHO9xMwIjLgaA7/AHttFD/OCVXkBcxQtBeIGlxr3SnxAFtvvaWS1TIsRSDfQRkwp4V+HpSdcML3MclE3sIfQoqNT6SqpC1RLhqAIuRp4bwtG5CQGp3yamwit6SesKUaRWe2g3MiasF3jEq35fLWNuAU6TTz38R0tWpt1Qj0P8z0Fj3WmO/EaiDTpvzVyvkwv+keX2S5F0efGJedeJLECS55SxwGGO5kGCpXMuKYtJ0/hbjn6SKLR1ogjhEK4NtF4Y4CLaEDQwCSK0W04CFCtEdbDKw2jMDhQoItzhIj7RkxGjdo8crawRGktN9ZBI7M6Ork7A6SlxaWN5dV3tKfMKmm0ZIWl0UmaD3bzG5kx4/CbPHvdZi8zHvmUj2c3J6BI4GII4SpEW8aY6MMwB4novYnEB8OEP5GI9df1nnKmbT8PqutRf8AE/UfpJcq/EtwPKN0KYtAsQwXnLBF4tyT4aASHF4JSNpy5p6CZTtitd49MXpYylzjAFDxIbW74Fgcz4vdbfrCpedGeaaR619oM9SRoRaK46QabxFFcjaT06xMCTfWToIcTBgYtWwvIv6onukDsAIDXxvDtMkLhd0qh5xmJzxE91fffoNvMzI4vHOxCgm7HTXSXOT5baxOp5nrHwXNLDDVqzm7EeAEvsGGkeFwoAh1NdIykFPo520mf7TYT21B1G6+8viJd1mgdI3v3/SNPshXo8bM5RrLTtHgvZYh1GxPEPAyvojWWIfS3wSWEMWQUNpMJJnVKxEyMIr11EgJnFARAZoKVgdopMr8KxDEQ1jNgExS0QPG2jlWYzQ8NHcUbwxRCLh//9k=",
      tags: ["질문", "Java", "피보나치 수"],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2234,
      boardType: 1,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2239,
      boardType: 1,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2235,
      boardType: 1,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
  ];
};

export const getBoardTypes = async () => {
  const response: BoardType[] = [
    {
      boardTypeId: 1,
      title: "일반 질문",
    },
    {
      boardTypeId: 2,
      title: "일반 자유",
    },
    {
      boardTypeId: 3,
      title: "알고리즘 질문",
    },
    {
      boardTypeId: 4,
      title: "알고리즘 피드백",
    },
  ];

  return response;
};

export const getMyQuestions = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하",
        solved: true,
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 101,
  };

  return response;
};

export const getMyFeedbacks = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "피드백입니다. 피드피드 피드백입니다. 피드피드 피드백입니다 .피드피드백입니다.",
        solved: true,
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: true,
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 26,
  };

  return response;
};

export const getMyAnswers = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title:
          "댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ",
        content:
          "님들 산타가 언제 쉬는지 암? 님들 산타가 언제 쉬는지 암? 님들 산타가 언제 쉬는지 암? 님들 산타가 언제 쉬는지 암? 님들 산타가 언제 쉬는지 암?",
        solved: true,
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 10,
  };

  return response;
};

export const getMyFree = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하",
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 10,
  };

  return response;
};

export const getMyComments = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.",
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 26,
  };

  return response;
};

export const getMyFavorites = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글내가 좋아요한 글",
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: true,
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 10,
  };

  return response;
};

export const getBoardDetail = async (
  boardId: string | number,
): Promise<Board> => {
  return {
    boardId: 2231,
    boardType: 2,
    user: {
      userId: 1,
      profile:
        "data:image/jpeg;base64,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",
      nickname: "황야라니",
    },
    title: "저메추 부탁드립니다",
    content: `<h2 style="margin-left: 0px!important;">안녕하세요. 오늘은 <strong><em><u>저녁 메뉴</u></em> </strong>를 추천해볼 겁니다.</h2><p style="margin-left: 0px!important;">아주 중요한 순간이라고 생각됩니다. (<s>사실 아님</s>)</p><p style="margin-left: 0px!important;">전체적으로 순위를 매기겠습니다.</p><ol class="tight" data-tight="true"><li><p style="margin-left: 0px!important;">돼지 갈비</p></li><li><p style="margin-left: 0px!important;">스시</p></li><li><p style="margin-left: 0px!important;">햄버거</p></li><li><p style="margin-left: 0px!important;">치킨</p></li></ol><p style="margin-left: 0px!important;"></p><p style="margin-left: 0px!important;">순위에 뽑히지 못한 나머지를 알려드리겠습니다.</p><ul class="tight" data-tight="true"><li><p style="margin-left: 0px!important;">라멘</p></li><li><p style="margin-left: 0px!important;">곱창</p><ul class="tight" data-tight="true"><li><p style="margin-left: 0px!important;">야채 곱창</p></li><li><p style="margin-left: 0px!important;">알곱창</p></li></ul></li><li><p style="margin-left: 0px!important;">만두</p></li><li><p style="margin-left: 0px!important;">닭갈비</p></li></ul><p style="margin-left: 0px!important;"></p><blockquote><p style="margin-left: 0px!important;">닭갈비는 아주 중요한 포인트입니다. 왜냐하면 제가 오늘 저녁으로 먹었기 때문이죠</p></blockquote><p style="margin-left: 0px!important;">그리고 가장 중요한 맛집 소개를 하겠습니다.</p><ul class="tight" data-tight="true"><li><p style="margin-left: 0px!important;"><a target="_blank" rel="noopener noreferrer nofollow" href="https://search.naver.com/search.naver?where=nexearch&amp;sm=top_hty&amp;fbm=0&amp;ie=utf8&amp;query=%EB%A7%8C%EB%91%90">만두 맛집</a></p></li><li><p style="margin-left: 0px!important;"><a target="_blank" rel="noopener noreferrer nofollow" href="https://search.naver.com/search.naver?sm=tab_hty.top&amp;where=nexearch&amp;query=%EC%95%84%EB%AC%B4+%EB%A7%9B%EC%A7%91&amp;oquery=%EB%A7%8C%EB%91%90&amp;tqi=ikioGdqVN8Cssi7MshRssssssDV-061071">아무 맛집</a></p></li></ul><p style="margin-left: 0px!important;"></p><img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MzFfMTcg%2FMDAxNjg1NTQwMzE3NTYx.zB4UNUQCdZrqYZqUX9267JJNW2A2T4ayxvNBqTCexsMg.UPVz8v-1IeOQZaO1qa7ED9qN96DqOrjvURZvBNqpKFIg.JPEG.alwyha%2Foutput_4075260260.jpg&amp;type=a340" style="width: 261px; height: 327.231px; cursor: pointer;"><hr><table><tbody><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px!important;">이것은 테이블 1</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px!important;">이것은 테이블 2</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px!important;">이것은 테이블 3</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px!important;">이것은 테이블 6</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px!important;">이것은 테이블 5</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px!important;">이것은 테이블 4</p></td></tr></tbody></table><div data-youtube-video=""><iframe width="320" height="180" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" interfacelanguage="ko" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube.com/embed/uEWxXlB7uzM?si=1NoEaCNGHU4AghYM" start="0"></iframe></div><p style="margin-left: 0px!important;"></p><p style="margin-left: 30px !important;">asd</p><pre><code class="language-javascript">const a = 2;
const b = 5;

console.log(a + b);

function say(msg) {
    console.log(msg);
}

say("배고파");</code></pre>
<pre><code class="language-python">a = 2;
b = 5;

print(a + b);

def say(msg):
    console.log(msg);


say("배고파")</code></pre>`,
    views: 32,
    likeTotal: 27,
    isSolved: true,
    isLike: false,
    isView: false,
    createdTime: "2023-12-25 12:25:25",
  };
};

export interface ResponseComment {
  comments: Comment[];
  total: number;
}

export const getComments = async (
  boardId: string | number,
): Promise<ResponseComment> => {
  return {
    comments: [
      {
        commentId: 1323,
        boardId: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        content: "제가 생각하기에는 저는 똥이 마려워용!!~",
        recommend: 0,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        commentId: 1324,
        boardId: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        content: "제가 생각하기에는 저는 똥이 마려워용!!~",
        recommend: 0,
        createdTime: "2023-12-25 12:25:25",
      },
    ],
    total: 2,
  };
};
