package com.lydia.lakeSidehotel.service;

import com.lydia.lakeSidehotel.exception.RoleAlreadyExistException;
import com.lydia.lakeSidehotel.exception.UserAlreadyExistsException;
import com.lydia.lakeSidehotel.model.Role;
import com.lydia.lakeSidehotel.model.User;
import com.lydia.lakeSidehotel.repository.RoleRepository;
import com.lydia.lakeSidehotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName = "ROLE_" + theRole.getName().toUpperCase();
        Role role = new Role(roleName);

        if (roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistException(theRole.getName() + " role already exists");
        }
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        // 删除这条role，并且删除user中对应这条role
        this.removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);

        if (user.isPresent() && user.get().getRoles().contains(role.get())) {
            throw new UserAlreadyExistsException(
                    user.get().getFirstName() + " is already assigned to the" + role.get().getName() + " role");
        }

        if (role.isPresent()) {
            role.get().assignRoleToUser(user.get());
            // 不明白这里为什么要保存，也不明白这里的保存，是否保存了user的
            roleRepository.save(role.get());
        }
        return user.get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);

        if (role.isPresent() && role.get().getUsers().contains(user.get())) {
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        // 找出对应要删除的role
        // 但是不明白这里为什么要在这里处理，和在role实体中处理一部分
        Optional<Role> role = roleRepository.findById(roleId);
        role.ifPresent(Role::removeAllUsersFromRole);
        // 保存修改后的role
        return roleRepository.save(role.get());
    }
}