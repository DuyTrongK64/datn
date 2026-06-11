package com.duytrong.attendance.security;

import com.duytrong.attendance.common.enums.UserStatus;
import com.duytrong.attendance.domain.AppUser;
import com.duytrong.attendance.domain.Role;
import com.duytrong.attendance.domain.UserRole;
import com.duytrong.attendance.repository.AppUserRepository;
import com.duytrong.attendance.repository.RoleRepository;
import com.duytrong.attendance.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final AppUserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepository.findByUsernameIgnoreCase(username == null ? "" : username.trim())
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản"));

        boolean enabled = user.getStatus() == UserStatus.ACTIVE
                && (user.getLockedUntil() == null || user.getLockedUntil().isBefore(LocalDateTime.now()));

        List<UserRole> userRoles = userRoleRepository.findByUserId(user.getId());
        Map<UUID, Role> roles = roleRepository.findAllById(userRoles.stream().map(UserRole::getRoleId).toList())
                .stream().collect(Collectors.toMap(Role::getId, r -> r));

        List<SimpleGrantedAuthority> authorities = userRoles.stream()
                .map(UserRole::getRoleId)
                .map(roles::get)
                .filter(role -> role != null)
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getCode()))
                .toList();

        return User.withUsername(user.getUsername())
                .password(user.getPasswordHash())
                .authorities(authorities)
                .accountLocked(!enabled)
                .disabled(user.getStatus() == UserStatus.DISABLED)
                .build();
    }
}
