package com.duytrong.attendance.controller;

import com.duytrong.attendance.domain.Team;
import com.duytrong.attendance.repository.TeamRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/teams")
@PreAuthorize("hasAnyRole('ADMIN','HR','LEADER')")
public class TeamController extends SimpleCrudController<Team> {
    public TeamController(TeamRepository repository) {
        super(repository);
    }
}
