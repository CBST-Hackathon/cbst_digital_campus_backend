// import Token from '#models/token'
import errorHandler from '#exceptions/error_handler'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register(ctx: HttpContext) {
    const { request, response } = ctx
    try {
      const payload = await request.validateUsing(registerValidator)
      const user = await User.create({ role: 'student', ...payload })
      return response.created({
        success: true,
        message: 'Registration has been Successful',
        content: user,
      })
    } catch (error) {
      errorHandler(error, ctx, 'Registration Error')
    }
  }

  async login(ctx: HttpContext) {
    const { request, response } = ctx
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      if (!user) {
        return response.abort({ success: false, message: 'Invalid credentials' })
      }

      if (!user.active) {
        return response.abort({
          success: false,
          message: 'Account is inactive. Please contact with administrator.',
        })
      }
      const token = await User.accessTokens.create(user, ['*'], {
        name: 'accessToken',
        expiresIn: '30 days',
      })

      return response.ok({ login: true, message: 'Login successful', token })
    } catch (error) {
      errorHandler(error, ctx, 'Login Error')
    }
  }

  async checkAuth(ctx: HttpContext) {
    const { auth, response } = ctx
    if (auth.isAuthenticated) {
      return response.json({ login: true, user: auth.user })
    } else {
      return response.badRequest({ login: false })
    }
  }

  async logout(ctx: HttpContext) {
    const { auth, response } = ctx
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return response.ok({ success: true, message: 'Logout successful' })
  }

  //   async changePassword(ctx: HttpContext) {
  //     const { auth, request, response } = ctx
  //     try {
  //       const { currentPassword, newPassword } = await request.validateUsing(changePasswordValidator)
  //       const userId = auth.user!.id
  //       const user = await User.findOrFail(userId)
  //       const isPasswordValid = await hash.verify(user.password, currentPassword)
  //       if (isPasswordValid) {
  //         user.password = newPassword
  //         await user.save()
  //         return response.json({ success: true })
  //       } else {
  //         return response.json({ success: false, message: 'Invalid password' })
  //       }
  //     } catch (error) {
  //       errorHandler(error, ctx, 'Change Password Error')
  //     }
  //   }

  //   async forgotPassword(ctx: HttpContext) {
  //     const { request, response } = ctx
  //     try {
  //       const { email } = request.all()
  //       if (!email) {
  //         return response.badRequest({
  //           success: false,
  //           message: 'email is not found',
  //         })
  //       }
  //       const user = await User.findByOrFail('email', email)
  //       if (!user) {
  //         return response.badRequest({ success: false, message: 'User is not found' })
  //       }
  //       const token = await Token.generatePasswordResetToken(user)
  //       await user.load('customer')
  //       await mail.sendLater(new ResetPasswordNotification(user, token))

  //       return response.json({ success: true, message: 'A token is sent to your mail' })
  //     } catch (error) {
  //       errorHandler(error, ctx, 'Forgot Password Error')
  //     }
  //   }

  //   async resetPassword(ctx: HttpContext) {
  //     const { request, response } = ctx
  //     try {
  //       const { password, token } = await request.validateUsing(resetPasswordValidator)
  //       const record = await Token.verify(token, 'PASSWORD_RESET')
  //       if (!record) {
  //         return response.badRequest({ success: false, message: 'Token is invalid' })
  //       }
  //       const user = await User.find(record.userId)
  //       if (!user) {
  //         return response.badRequest({ success: false, message: 'User is not found' })
  //       }
  //       user.password = password
  //       user.save()
  //       await record.delete()

  //       return response.json({ success: true, message: 'Password updated successfully' })
  //     } catch (error) {
  //       errorHandler(error, ctx, 'Reset Password Error')
  //     }
  //   }
}
