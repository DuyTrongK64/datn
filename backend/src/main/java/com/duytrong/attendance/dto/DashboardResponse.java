package com.duytrong.attendance.dto;

public record DashboardResponse(
        long totalEmployees,
        long checkedInToday,
        long lateToday,
        long absentToday,
        long pendingRequests,
        long totalDevices,
        long onlineDevices
) {}
