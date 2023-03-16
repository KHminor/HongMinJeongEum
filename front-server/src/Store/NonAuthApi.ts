import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

type PostData = {
  isAdmin: boolean,
  isSecession: boolean,
  nickname: string,
  password: string,
  phoneNumber: string,
  username: string
}

type login = {
  username: string,
  password: string,
}
const accessToken: any = localStorage.getItem('accessToken')
export const NonAuthApi = createApi({
  reducerPath: "NonAuthApi",
  tagTypes: ['NonAuthApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://hmje.net/api',
    prepareHeaders(headers) {
      headers.set(accessToken, accessToken)
    }
  }),
  endpoints: (builder) => ({
    // ================sms================
    // 1. 인증번호 체크
    postSmsmodify: builder.mutation({
      query: (data) => {
        console.log("인증번호 체크 rtk에서 받은 데이터 : ", data);
        return {
          url: `sms/modify`,
          method: "POST",
          body: {
            modifyNumber: data.modifyNumber,
            phoneNumber: data.phoneNumber,
            purpose: ""
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),
    // 2. 인증번호 보내기
    postSmssend: builder.mutation({
      query: (data) => {
        console.log("인증번호 보내기 rtk에서 받은 데이터 : ", data);
        return {
          url: `sms/modify`,
          method: "POST",
          body: {
            to: data.to
          }
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),


    // ================User================
    // 1. 닉네임 중복 체크
    postUserchecknickname: builder.mutation<PostData, PostData>({
      query: (data) => {
        console.log("닉네임 중복 체크 rtk에서 받은 데이터 : ", data);
        return {
          url: `user/check/nickname`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

    // 2. 아이디 중복
    postUsercheckusername: builder.mutation<PostData, PostData>({
      query: (data) => {
        console.log("아이디 중복 rtk에서 받은 데이터 : ", data);
        return {
          url: `user/check/username`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

    // 3. 회원가입

    postUserjoin: builder.mutation<PostData, PostData>({
      query: (data) => {
        console.log("회원가입 rtk에서 받은 데이터 : ", data);
        return {
          url: `user/join`,
          method: "POST",
          body: data
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),

    // 4. 로그인

    postUserlogin: builder.mutation<login, login>({
      query: (data) => {
        console.log("로그인 rtk에서 받은 데이터 : ", data);
        return {
          url: `/login`,
          method: "POST",
          body: {
            username: data.username,
            password: data.password
          },
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
    }),


    //  --------- STUDY ------------
        // 2. 단어학습 결과
        postStudyWordResult: builder.mutation<any,any>({
          query: (data) => {
            return {
              url: `/study/word/result`,
              method: 'POST',
              body:{
                rightIdList: data.correct,
                semo: data.semo,
                userId: data.userId,
                wrongIdList: data.wrong,
              },
            }
          },
          invalidatesTags: (result, error, arg) => [{ type: "NonAuthApi" }]
        }),
    
  })
})

export const {
  // sms

  usePostSmsmodifyMutation,
  usePostSmssendMutation,
  // user

  usePostUserchecknicknameMutation,
  usePostUsercheckusernameMutation,
  usePostUserjoinMutation,
  usePostUserloginMutation,

  // STUDY
  usePostStudyWordResultMutation,

} = NonAuthApi;