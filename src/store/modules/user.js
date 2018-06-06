import {
  newUser,
  getAllUsers,
  revokeRolefromUser,
  assignRoletoUser
} from '@/apis/user'

// initial state
const state = {
  users: [],
  total: 0
}

// getters
const getters = {
  usersMaptoList: (state, getters) => {
    // console.log(state)
    let us = state.users
    let new_us = us.map(u => {
      let perms = {}
      let newRoles = Object.keys(u.roles).map(key => {
        let role = u.roles[key]
        perms = Object.assign(perms, role.permissions)
        return role
      })

      let newPerms = Object.keys(perms).map(key => {
        return perms[key]
      })

      u.roles = newRoles
      u.perms = newPerms
      return u
    })
    return new_us
  },

  originUsers: state => state.users,

  userTotal: state => state.total

}

// actions for api connect
const actions = {
  addUser ({commit, state}, {mobile}) {
    newUser({mobile}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      commit('setError', err)
    })
  },

  allUsers ({commit, state}, {limit = 10, skip = 0}) {
    // console.log('all users')
    getAllUsers({limit, skip}).then(data => {
      if (data.code === 0) {
        commit('refreshUsers', {users: data.users, total: data.total})
        commit('setMessage', data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      // console.error(err)
      commit('setError', err)
    })
  },

  assignRole ({commit, state}, {userId, roleId}) {
    // console.log('assign users')
    assignRoletoUser({user_id: userId, role_id: roleId}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      console.error(err)
      commit('setError', err)
    })
  },

  revokeRole ({commit, state}, {userId, roleId}) {
    // console.log('revoke users')
    revokeRolefromUser({user_id: userId, role_id: roleId}).then(data => {
      // console.log(data)
      if (data.code === 0) {
        commit('setMessage', data.message)
        return
      }
      commit('setError', {message: data.message})
    }).catch(err => {
      console.error(err)
      commit('setError', err)
    })
  }
}

// mutations for update state ?
const mutations = {
  addUser (state, {user}) {
    state.users.push(user)
  },

  refreshUsers (state, {users, total}) {
    state.users = users
    state.total = total
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}