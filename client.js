// @local/bigfish-swarm · 鱼群雷达（右下角悬浮条版）
// 悬浮条常驻页面右下角，显示当前会话「活跃子智能体数」；点开弹出卡片列表：
// 任务名 / agent 标识 / 运行时长 / token 流光进度条 / 当前动作；完成的卡 60 秒内淡出。
// 数据：root 作用域 useSessions（会话摘要+投影）+ useSessionStatus（运行状态）；样式走 --dsw-alias-* token。
window.__ModuleLoader__.load({
  id: '@local/bigfish-swarm',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const PANEL_ID = 'bigfish-swarm'
    // 生图模型生成的「蓝毛小女仆大肥鱼」，白底已去透明，内联避免额外请求
    const PET_RUNNER = 'data:image/png;base64,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'
    const FADE_MS = 60000
    const TOKEN_CAP = 60000
    const MAX_ANIMATED = 20
    const LIGHT_ANIMATED = 10
    const MAX_ROWS = 60

    let serviceCtx = null

    // ================= 工具 =================
    function tokenTotal(usage) {
      if (!usage || typeof usage !== 'object') return 0
      return (Number(usage.uncachedInputTokens) || 0)
        + (Number(usage.outputTokens) || 0)
        + (Number(usage.cacheReadTokens) || 0)
        + (Number(usage.cacheWriteTokens) || 0)
    }

    function fmtTokens(value) {
      const n = Number(value) || 0
      if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
      if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
      return String(Math.round(n))
    }

    function fmtDuration(ms) {
      const total = Math.max(0, Math.floor((Number(ms) || 0) / 1000))
      const hours = Math.floor(total / 3600)
      const minutes = Math.floor((total % 3600) / 60)
      const seconds = total % 60
      const two = function (v) { return (v < 10 ? '0' : '') + v }
      if (hours > 0) return hours + ':' + two(minutes) + ':' + two(seconds)
      return minutes + ':' + two(seconds)
    }

    function tailText(text, limit) {
      const flat = String(text || '').replace(/\s+/g, ' ').trim()
      if (!flat) return ''
      return flat.length > limit ? flat.slice(0, limit) + '…' : flat
    }

    function catalogLabel(entry) {
      return tailText(entry && (entry.label || entry.name || entry.id), 48) || '未命名任务'
    }

    function shortId(id) {
      const text = String(id || '')
      return text.length > 10 ? 'agent-' + text.slice(0, 8) : (text || 'agent')
    }

    // ================= 样式 =================
    const CSS = [
      '.bsw-dock{position:fixed;right:18px;bottom:58px;z-index:69;display:flex;flex-direction:column;align-items:flex-end;gap:12px;pointer-events:auto;font-family:inherit}',
      '.bsw-pill{display:inline-flex;align-items:center;gap:10px;padding:9px 18px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2,#2F3441);background:var(--dsw-alias-bg-overlay,rgba(24,28,38,.94));box-shadow:0 8px 26px rgba(0,0,0,.28);color:var(--dsw-alias-label-primary,#E9ECF3);font-size:calc(24px * var(--bsw-fs,1));font-weight:600;cursor:pointer;user-select:none;transition:border-color .15s ease,transform .05s ease}',
      '.bsw-pill:hover{border-color:var(--bsw-blue,#4DA3FF)}',
      '.bsw-pill:active{transform:translateY(1px)}',
      '.bsw-pill-dot{position:relative;width:12px;height:12px;border-radius:50%;background:var(--bsw-blue,#4DA3FF)}',
      '.bsw-pill-dot-live{animation:bsw-pulse 1.6s ease-in-out infinite}',
      '.bsw-pill-dot-idle{background:var(--dsw-alias-state-idle-primary,#6B7280);animation:none}',
      '.bsw-pill-count{font-variant-numeric:tabular-nums;color:var(--bsw-blue-2,#38BDF8)}',
      '.bsw-pill-count-idle{color:var(--dsw-alias-label-secondary,#9AA3B6)}',
      '.bsw-pill-caret{font-size:calc(20px * var(--bsw-fs,1));color:var(--dsw-alias-label-secondary,#9AA3B6);margin-left:2px}',
      '.bsw-pop{width:620px;max-width:calc(100vw - 48px);max-height:min(560px,calc(100dvh - 428px));display:flex;flex-direction:column;border-radius:16px;border:1px solid var(--dsw-alias-border-l1,#242833);background:var(--dsw-alias-bg-layer-1,#12151C);box-shadow:0 18px 48px rgba(0,0,0,.4);overflow:hidden;animation:bsw-pop-in .16s ease-out}',
      '@keyframes bsw-pop-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
      '.bsw-pop-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px 12px;border-bottom:1px solid var(--dsw-alias-border-l1,#242833);background:var(--dsw-alias-bg-layer-2,#191D26)}',
      '.bsw-pop-title{display:flex;align-items:center;gap:12px;font-size:calc(26px * var(--bsw-fs,1));font-weight:680;flex-shrink:0;white-space:nowrap}',
      '.bsw-pop-scan{position:relative;flex:1 1 40px;min-width:30px;height:2px;margin:0 14px;overflow:hidden;border-radius:999px;background:linear-gradient(90deg,transparent,var(--dsw-alias-border-l1,#242833),transparent)}',
      '.bsw-pop-scan i{position:absolute;top:0;left:0;width:34%;height:100%;border-radius:999px;background:linear-gradient(90deg,transparent,var(--bsw-blue-2,#38BDF8),transparent);animation:bsw-sweep 3.2s cubic-bezier(.4,0,.2,1) infinite}',
      '@keyframes bsw-sweep{0%{transform:translateX(-120%)}55%{transform:translateX(260%)}100%{transform:translateX(430%)}}',
      '.bsw-pop-stat{font-size:calc(22px * var(--bsw-fs,1));color:var(--dsw-alias-label-secondary,#9AA3B6);font-variant-numeric:tabular-nums;white-space:nowrap;flex-shrink:0}',
      '.bsw-pop-close{appearance:none;border:1px solid var(--dsw-alias-border-l1,#242833);background:transparent;color:var(--dsw-alias-label-secondary,#9AA3B6);border-radius:10px;padding:4px 14px;font-size:calc(22px * var(--bsw-fs,1));font-family:inherit;cursor:pointer;flex-shrink:0;white-space:nowrap}',
      '.bsw-pop-close:hover{color:var(--dsw-alias-label-primary,#E9ECF3);border-color:var(--dsw-alias-border-l2,#2F3441)}',
      '.bsw-pop-body{padding:14px 16px 16px;overflow:auto;display:flex;flex-direction:column;gap:12px}',
      '.bsw-card{position:relative;display:flex;flex-direction:column;justify-content:center;padding:16px 18px 16px 20px;background:var(--dsw-alias-bg-layer-1,#12151C);border:1px solid var(--dsw-alias-border-l1,#242833);border-left:6px solid var(--bsw-blue,#4DA3FF);border-radius:12px;transition:opacity 1.2s cubic-bezier(.4,0,1,1),transform 1.2s cubic-bezier(.4,0,1,1),border-color .2s ease,background .2s ease;animation:bsw-enter .22s ease-out}',
      '.bsw-card-done{border-left-color:var(--dsw-alias-state-idle-primary,#6B7280);opacity:.7;background:var(--dsw-alias-bg-layer-2,#191D26)}',
      '.bsw-card-retire{opacity:0;transform:translateY(10px)}',
      '@keyframes bsw-enter{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}',
      '.bsw-row1{display:flex;align-items:center;justify-content:space-between;gap:12px}',
      '.bsw-name-wrap{display:flex;align-items:center;gap:12px;min-width:0}',
      '.bsw-dotwrap{position:relative;width:14px;height:14px;flex-shrink:0}',
      '.bsw-dot{position:relative;z-index:1;width:14px;height:14px;border-radius:50%;background:var(--bsw-blue,#4DA3FF);animation:bsw-pulse 1.6s ease-in-out infinite}',
      '.bsw-dot-done{background:var(--dsw-alias-state-idle-primary,#6B7280);animation:none}',
      '@keyframes bsw-pulse{0%,100%{opacity:.45}50%{opacity:1}}',
      '.bsw-ring{position:absolute;inset:0;border-radius:50%;border:2px solid var(--bsw-blue,#4DA3FF);animation:bsw-ring 1.8s cubic-bezier(.2,.6,.3,1) infinite}',
      '@keyframes bsw-ring{0%{transform:scale(1);opacity:.5}100%{transform:scale(2.4);opacity:0}}',
      '.bsw-name{font-size:calc(26px * var(--bsw-fs,1));font-weight:640;line-height:1.35;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.bsw-duration{font-size:calc(24px * var(--bsw-fs,1));font-weight:640;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary,#E9ECF3);white-space:nowrap}',
      '.bsw-duration-done{color:var(--dsw-alias-label-secondary,#9AA3B6);font-weight:500}',
      '.bsw-row2{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px;min-width:0}',
      '.bsw-id{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:calc(22px * var(--bsw-fs,1));padding:1px 10px;border:1px solid var(--dsw-alias-border-l1,#242833);border-radius:999px;color:var(--dsw-alias-label-secondary,#9AA3B6);flex-shrink:0}',
      '.bsw-action{display:flex;align-items:center;gap:8px;min-width:0;font-size:calc(22px * var(--bsw-fs,1));color:var(--dsw-alias-label-secondary,#9AA3B6)}',
      '.bsw-action-name{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:calc(22px * var(--bsw-fs,1));padding:1px 10px;background:var(--dsw-alias-bg-layer-2,#191D26);border-radius:8px;color:var(--dsw-alias-label-primary,#E9ECF3);flex-shrink:0}',
      '.bsw-action-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.bsw-row3{display:flex;align-items:center;gap:14px;margin-top:10px}',
      '.bsw-progress{position:relative;flex:1;height:10px;border-radius:999px;background:var(--dsw-alias-bg-layer-2,#191D26);overflow:visible}',
      '.bsw-progress-fill{display:block;height:100%;width:100%;border-radius:999px;background:linear-gradient(90deg,var(--bsw-blue-2,#38BDF8),var(--bsw-blue,#4DA3FF));transform-origin:left;transition:transform .6s linear;position:relative;box-shadow:0 0 10px rgba(56,189,248,.55)}',
      '.bsw-progress-fill::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 20%,rgba(255,255,255,.38) 48%,transparent 76%);animation:bsw-sheen 2.4s linear infinite}',
      '@keyframes bsw-sheen{0%{transform:translateX(-120%)}100%{transform:translateX(220%)}}',
      '.bsw-row3{display:flex;align-items:center;gap:14px;margin-top:12px}',
      '.bsw-tokens{min-width:110px;text-align:right}',
      '.bsw-progress{position:relative;flex:1 1 auto;min-width:80px;height:14px;border-radius:999px;background:#1C2230;border:1px solid var(--dsw-alias-border-l1,#242833);box-sizing:border-box;overflow:visible}',
      '.bsw-tokens-line{display:flex;justify-content:flex-end}',
      '.bsw-pet-runner{position:absolute;top:50%;width:38px;height:38px;transform:translate(-50%,-50%);pointer-events:none;transition:left .6s linear;z-index:2;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 1px 3px rgba(0,0,0,.55)) drop-shadow(0 0 8px rgba(56,189,248,.28));animation:bsw-swim 2.4s ease-in-out infinite}',
      '@keyframes bsw-swim{0%,100%{transform:translate(-50%,-50%) rotate(-2deg) translateY(1px)}50%{transform:translate(-50%,-52%) rotate(3deg) translateY(-2px)}}',
      '.bsw-pet-tail{transform-box:fill-box;transform-origin:90% 50%;animation:bsw-pet-tail 1.3s ease-in-out infinite}',
      '@keyframes bsw-pet-tail{0%,100%{transform:rotate(0deg)}50%{transform:rotate(18deg)}}',
      '.bsw-pet-done{animation:none}',
      '.bsw-light .bsw-pet-runner,.bsw-light .bsw-pet-tail,.bsw-light .bsw-fish,.bsw-light .bsw-fish-tail,.bsw-light .bsw-progress-fill::after,.bsw-static .bsw-pet-runner,.bsw-static .bsw-pet-tail{animation:none}',
      '.bsw-light .bsw-pet-runner{filter:drop-shadow(0 1px 3px rgba(0,0,0,.5))}',
      '.bsw-pet-img{width:100%;height:100%;object-fit:contain;display:block}',
      '.bsw-card-done .bsw-pet-runner{filter:grayscale(1) opacity(.45)}',
      '.bsw-progress-fill{border-radius:999px}',
      '.bsw-tokens{font-size:calc(22px * var(--bsw-fs,1));font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary,#9AA3B6);white-space:nowrap}',
      '.bsw-tokens-hot{color:var(--dsw-alias-state-warn-primary,#FFB020)}',
      '.bsw-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:26px 18px 30px;text-align:center}',
      '.bsw-radar{position:relative;width:150px;height:150px;border-radius:50%;border:1px solid var(--dsw-alias-border-l1,#242833);display:flex;align-items:center;justify-content:center;overflow:hidden}',
      '.bsw-radar::before,.bsw-radar::after{content:"";position:absolute;border-radius:50%;border:1px solid var(--dsw-alias-border-l1,#242833)}',
      '.bsw-radar::before{inset:26px}',
      '.bsw-radar::after{inset:54px}',
      '.bsw-radar-sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,transparent 0deg,transparent 300deg,color-mix(in srgb,var(--bsw-blue,#4DA3FF) 30%,transparent) 346deg,color-mix(in srgb,var(--bsw-blue,#4DA3FF) 50%,transparent) 360deg);animation:bsw-spin 4s linear infinite}',
      '@keyframes bsw-spin{to{transform:rotate(360deg)}}',
      '.bsw-radar-core{width:10px;height:10px;border-radius:50%;background:var(--dsw-alias-state-idle-primary,#6B7280);z-index:1}',
      '.bsw-empty-title{font-size:calc(26px * var(--bsw-fs,1));font-weight:640;margin-top:16px}',
      '.bsw-empty-sub{font-size:calc(22px * var(--bsw-fs,1));color:var(--dsw-alias-label-secondary,#9AA3B6);margin-top:8px}',
      '.bsw-static .bsw-ring,.bsw-static .bsw-dot,.bsw-static .bsw-progress-fill::after,.bsw-static .bsw-pop-scan i{animation:none}',
      '.bsw-static .bsw-ring{display:none}',
      '.bsw-static .bsw-progress-fill{transition:none}',
      '@media (prefers-reduced-motion:reduce){.bsw-ring,.bsw-dot,.bsw-progress-fill::after,.bsw-pop-scan i,.bsw-radar-sweep,.bsw-pill-dot-live{animation:none}.bsw-ring{display:none}.bsw-progress-fill{transition:none}}',
      '.bsw-dock{--bsw-blue:#4DA3FF;--bsw-blue-2:#38BDF8;--bsw-blue-3:#2563EB}',
      '.bsw-fish-row{display:inline-flex;align-items:center;gap:2px;margin-right:10px;flex-shrink:0}',
      '.bsw-fish{display:inline-block;line-height:0;animation:bsw-float 2.8s ease-in-out infinite}',
      '@keyframes bsw-float{0%,100%{transform:translateY(1.5px) rotate(-2deg)}50%{transform:translateY(-2.5px) rotate(2deg)}}',
      '.bsw-fish-tail{transform-box:fill-box;transform-origin:0% 50%;animation:bsw-tail 1.1s ease-in-out infinite}',
      '@keyframes bsw-tail{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-16deg)}}',
      '.bsw-fish-eye{animation:bsw-blink 4.2s ease-in-out infinite}',
      '@keyframes bsw-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.15)}}',
      '.bsw-fish-still{animation:none}',
      '.bsw-pill{background:linear-gradient(135deg,color-mix(in srgb,var(--bsw-blue-3,#2563EB) 22%,transparent),transparent),var(--dsw-alias-bg-overlay,rgba(24,28,38,.94))!important;border-color:var(--bsw-blue-2,#38BDF8)!important}',
      '.bsw-pill:hover{box-shadow:0 8px 26px color-mix(in srgb,var(--bsw-blue-2,#38BDF8) 22%,transparent)}',
      '.bsw-pop{border-color:rgba(77,163,255,.35)}',
      '.bsw-dotwrap{width:28px;height:26px;display:flex;align-items:center;justify-content:center}',
      '.bsw-pill-text{display:inline-flex;align-items:baseline;gap:2px}',
      '@media (max-width:720px){.bsw-dock{bottom:116px;right:12px}}',
      '.bsw-settings{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;padding:12px 18px;border-bottom:1px solid var(--dsw-alias-border-l1,#242833);background:var(--dsw-alias-bg-layer-2,#191D26);font-size:calc(22px * var(--bsw-fs,1))}',
      '.bsw-set-group{display:inline-flex;align-items:center;gap:8px;color:var(--dsw-alias-label-secondary,#9AA3B6)}',
      '.bsw-set-btn{appearance:none;border:1px solid var(--dsw-alias-border-l1,#242833);background:transparent;color:var(--dsw-alias-label-primary,#E9ECF3);border-radius:9px;padding:2px 12px;font-size:calc(22px * var(--bsw-fs,1));font-family:inherit;cursor:pointer;line-height:1.7}',
      '.bsw-set-btn:hover{border-color:var(--bsw-blue-2,#38BDF8)}',
      '.bsw-set-btn-on{border-color:var(--bsw-blue-2,#38BDF8);background:rgba(56,189,248,.16);color:var(--bsw-blue-2,#38BDF8);font-weight:640}',
      '.bsw-sw-preview{width:22px;height:22px;border-radius:7px;display:inline-block;border:1px solid rgba(255,255,255,.25)}',


    ].join('\n')

    function ensureCss() {
      if (typeof document === 'undefined') return
      // 热更新时旧样式可能来自上一版布局，必须替换而不是跳过（否则新布局失效）
      const old = document.getElementById('bigfish-swarm-css')
      if (old && old.parentNode) old.parentNode.removeChild(old)
      const tag = document.createElement('style')
      tag.id = 'bigfish-swarm-css'
      tag.textContent = CSS
      document.head.appendChild(tag)
    }

    // ================= 每秒时钟 =================
    function useNow(intervalMs) {
      const state = React.useState(function () { return Date.now() })
      const now = state[0]
      const setNow = state[1]
      React.useEffect(function () {
        const timer = setInterval(function () { setNow(Date.now()) }, intervalMs || 1000)
        return function () { clearInterval(timer) }
      }, [intervalMs])
      return now
    }

    // ================= 选当前会话 =================
    // 优先「占据主视图」的会话；面板/悬浮条不占主视图时退回到最近更新的会话。
    function pickSession(byId) {
      if (!byId) return null
      let main = null
      let fallback = null
      for (const id in byId) {
        const record = byId[id]
        if (!record) continue
        if (record.retainedBy && (record.retainedBy.mainView || 0) > 0) {
          if (!main || (record.updatedAt || 0) > (byId[main].updatedAt || 0)) main = id
          continue
        }
        if (record.origin === 'subagent') continue
        if (!fallback || (record.updatedAt || 0) > (byId[fallback].updatedAt || 0)) fallback = id
      }
      return main || fallback
    }

    // ================= 实时数据 =================
    function useRadarData(props) {
      const useSessions = props.useSessions
      const useSessionStatus = props.useSessionStatus
      const now = useNow(1000)

      const sessions = useSessions(function (state) { return state })
      const statuses = useSessionStatus(function (map) { return map })

      const byId = (sessions && sessions.byId) || {}
      const projections = (sessions && sessions.projectionsBySession) || {}
      const sessionId = React.useMemo(function () { return pickSession(byId) }, [byId])

      // 未 attach 的子会话投影需要主动刷新一次（官方同款做法：refreshProjections）
      React.useEffect(function () {
        if (!sessionId) return
        const ctx = serviceCtx
        try {
          if (ctx && ctx.sessions && typeof ctx.sessions.refreshProjections === 'function') {
            ctx.sessions.refreshProjections(sessionId)
          }
        } catch (error) { /* 刷新失败不影响已有数据 */ }
      }, [sessionId])

      const agentRows = React.useMemo(function () {
        const rootProjections = sessionId ? (projections[sessionId] && projections[sessionId].values) : null
        const catalog = rootProjections && Array.isArray(rootProjections.subagentCatalog)
          ? rootProjections.subagentCatalog : []

        const rows = []
        catalog.forEach(function (entry) {
          const childId = entry && entry.id
          if (!childId) return
          const summary = byId[childId] || {}
          const status = statuses && typeof statuses.get === 'function' ? statuses.get(childId) : undefined
          const running = status ? status.running === true : summary.running === true
          const pv = summary.projectionValues || {}
          const timing = pv.subagentTiming
          const startedAt = Number(entry.createdAt) || Number(summary.updatedAt) || now
          const tokens = tokenTotal(pv.tokenUsage)
          const doneAt = running ? null : (Number(summary.updatedAt) || (timing && timing.active && timing.active.through) || now)
          if (!running && doneAt && now - doneAt > FADE_MS) return

          let durationMs = 0
          if (timing && Number(timing.settledMs)) durationMs += Number(timing.settledMs) || 0
          if (timing && timing.active && Number(timing.active.since)) {
            const until = running ? now : (Number(timing.active.through) || now)
            durationMs += Math.max(0, until - Number(timing.active.since))
          } else if (!timing) {
            durationMs = Math.max(0, (running ? now : doneAt) - startedAt)
          }

          const turnOutline = pv.turnOutline || {}
          const draft = tailText(turnOutline.draft, 40)
          const action = draft
            ? { text: draft }
            : { text: running ? '思考中' : '已完成' }

          rows.push({
            id: childId,
            name: catalogLabel(entry),
            agentId: shortId(childId),
            running: running,
            startedAt: startedAt,
            doneAt: doneAt,
            durationMs: durationMs,
            tokens: tokens,
            tokenCap: TOKEN_CAP,
            action: action,
            pendingInteraction: Boolean(status && status.pendingInteraction),
          })
        })

        rows.sort(function (a, b) {
          if (a.running !== b.running) return a.running ? -1 : 1
          if (a.running) return a.startedAt - b.startedAt
          return (b.doneAt || 0) - (a.doneAt || 0)
        })
        return rows
      }, [sessionId, projections, byId, statuses, now])

      const activeCount = agentRows.filter(function (row) { return row.running }).length
      const totalTokens = agentRows.reduce(function (sum, row) { return sum + (row.running ? row.tokens : 0) }, 0)
      return { rows: agentRows, activeCount: activeCount, totalTokens: totalTokens, now: now, bound: Boolean(sessionId) }
    }

    // 无 hooks 环境（预览）时的兜底：允许外部注入 window.__BIGFISH_SWARM_API__
    function useFallbackData() {
      const now = useNow(1000)
      const state = React.useState(function () { return [] })
      const rows = state[0]
      const setRows = state[1]
      React.useEffect(function () {
        const api = typeof window !== 'undefined' ? window.__BIGFISH_SWARM_API__ : null
        if (typeof api !== 'function') return function () {}
        const timer = setInterval(function () {
          let raw = null
          try { raw = api() } catch (error) { raw = null }
          const list = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.agents) ? raw.agents : [])
          setRows(list.map(function (item, index) {
            const running = item.status !== 'done'
            const startedAt = Number(item.startedAt) || Date.now()
            const doneAt = running ? null : (Number(item.doneAt) || Date.now())
            return {
              id: String(item.id || ('agent-' + (index + 1))),
              name: tailText(item.name, 48) || '未命名任务',
              agentId: shortId(item.id || ('agent-' + (index + 1))),
              running: running,
              startedAt: startedAt,
              doneAt: doneAt,
              durationMs: Math.max(0, (running ? Date.now() : doneAt) - startedAt),
              tokens: Number(item.tokens) || 0,
              tokenCap: Number(item.tokenLimit) > 0 ? Number(item.tokenLimit) : TOKEN_CAP,
              action: { text: tailText(item.action, 30) || '工作中' },
              pendingInteraction: false,
            }
          }).filter(function (row) { return row.running || Date.now() - (row.doneAt || 0) <= FADE_MS }))
        }, 1000)
        return function () { clearInterval(timer) }
      }, [])
      const activeCount = rows.filter(function (r) { return r.running }).length
      return { rows: rows, activeCount: activeCount, totalTokens: 0, now: now, bound: false }
    }

    // ================= 卡片 =================
    function AgentCard(props) {
      const row = props.row
      const now = props.now
      const done = !row.running
      // 进度条按「本屏消耗最多的那个」为满格，最长的就是用的最多的，一眼看出谁最费 token
      const base = Number(props.maxTokens) > 0 ? Number(props.maxTokens) : (row.tokenCap || TOKEN_CAP)
      const pct = Math.max(0.02, Math.min(1, row.tokens / base))
      const hot = pct > 0.85
      const actionText = row.action && row.action.text ? row.action.text : ''
      const retiring = done && row.doneAt && now - row.doneAt > FADE_MS - 1500
      return h('div', {
        className: 'bsw-card' + (done ? ' bsw-card-done' : '') + (retiring ? ' bsw-card-retire' : ''),
        'data-state': done ? 'done' : 'running',
      },
        h('div', { className: 'bsw-row1' },
          h('div', { className: 'bsw-name-wrap' },
            h('div', { className: 'bsw-dotwrap' },
              !done && h('span', { className: 'bsw-ring' }),
              h('span', { className: 'bsw-dot' + (done ? ' bsw-dot-done' : '') })
            ),
            h('div', { className: 'bsw-name', title: row.name }, row.name)
          ),
          h('div', { className: 'bsw-duration' + (done ? ' bsw-duration-done' : '') }, fmtDuration(row.durationMs))
        ),
        h('div', { className: 'bsw-row2' },
          h('span', { className: 'bsw-id' }, row.agentId),
          h('span', { className: 'bsw-action' },
            h('span', { className: 'bsw-action-name' }, done ? 'done' : (row.pendingInteraction ? 'wait' : 'live')),
            h('span', { className: 'bsw-action-text', title: actionText }, actionText)
          )
        ),
        h('div', { className: 'bsw-row3' },
          h('div', { className: 'bsw-progress' },
            h('span', { className: 'bsw-progress-fill', style: { transform: 'scaleX(' + pct + ')' } }),
            props.style !== 'minimal' && h(PetRunner, { done: done, pct: pct })
          ),
          h('span', { className: 'bsw-tokens' + (hot ? ' bsw-tokens-hot' : '') },
            fmtTokens(row.tokens) + (row.tokens >= base ? ' 最高' : ''))
        )
      )
    }

    // DS 大肥鱼：朝右游的蓝色小鱼（尾巴在左、眼睛在右），摆尾 + 浮动；idle 变灰不动
    function FishIcon(props) {
      const size = props.size || 20
      const idle = Boolean(props.idle)
      const body = idle ? 'var(--dsw-alias-state-idle-primary,#6B7280)' : 'var(--bsw-blue-2,#38BDF8)'
      const deep = idle ? 'var(--dsw-alias-state-idle-primary,#6B7280)' : 'var(--bsw-blue,#4DA3FF)'
      return h('span', {
        className: 'bsw-fish' + (idle || props.wave === false ? ' bsw-fish-still' : ''),
        style: { animationDelay: (Number(props.delay) || 0) + 'ms' },
        'aria-hidden': true,
      },
        h('svg', { width: size, height: Math.round(size * 0.72), viewBox: '0 0 32 23' },
          h('path', { className: 'bsw-fish-tail', d: 'M5 11.5 L0 6 L0 17 Z', fill: deep }),
          h('ellipse', { cx: 17, cy: 11.5, rx: 11.4, ry: 6.6, fill: body }),
          h('path', { d: 'M15 5.2 L10.5 2.2 L9 5.6 Z', fill: deep, opacity: .85 }),
          h('path', { d: 'M25 13.4 Q17 18.6 8 13.4 Q17 16.4 25 13.4 Z', fill: 'rgba(255,255,255,.35)' }),
          h('circle', { cx: 24.4, cy: 9.6, r: 2.3, fill: '#08111F' }),
          h('circle', { cx: 23.7, cy: 9, r: .8, fill: '#fff' })
        )
      )
    }

    // 「蓝毛小女仆大肥鱼」进度条牵引形象（生图模型出图，白底已透明）
    function PetRunner(props) {
      const done = Boolean(props && props.done)
      const pct = Math.max(0, Math.min(1, Number(props && props.pct) || 0))
      const left = Math.min(Math.max(pct * 100, 5), 94) + '%'
      return h('span', {
        className: 'bsw-pet-runner' + (done ? ' bsw-pet-done' : ''),
        style: { left: left },
        'aria-hidden': true,
      }, h('img', { className: 'bsw-pet-img', src: PET_RUNNER, alt: '', draggable: false }))
    }

    function fishList(count, alive, size, totalCount) {
      // 默认 5 条小鱼：前 count 条亮色，其余暗色陪游，形成鱼群感
      const total = totalCount || 5
      const active = Math.max(0, Math.min(count, total))
      const items = []
      for (let i = 0; i < total; i += 1) {
        items.push(h(FishIcon, {
          key: i,
          size: size || 20,
          idle: !alive || i >= active,
          delay: i * 160,
        }))
      }
      return items
    }

    function EmptyState() {
      return h('div', { className: 'bsw-empty' },
        h('div', { className: 'bsw-radar' },
          h('div', { className: 'bsw-radar-sweep' }),
          h('div', { className: 'bsw-radar-core' })
        ),
        h('div', { className: 'bsw-empty-title' }, '雷达静默 · 当前会话没有子智能体在跑'),
        h('div', { className: 'bsw-empty-sub' }, '派一个子代理，鱼群就亮起来')
      )
    }

    // ================= 悬浮条 + 弹层 =================
    function SwarmDock(props) {
      const hasReal = props && typeof props.useSessions === 'function' && typeof props.useSessionStatus === 'function'
      // 两个分支各自的 hooks 必须稳定：用子组件承载真实数据路径
      if (hasReal) return h(RealDock, props)
      return h(FallbackDock, props)
    }

    function RealDock(props) {
      const data = useRadarData(props)
      return h(DockView, { data: data })
    }

    function FallbackDock(props) {
      const data = useFallbackData()
      return h(DockView, { data: data })
    }

    // ================= 偏好设置（localStorage 持久化） =================
    const PREFS_KEY = 'bigfish-swarm.prefs'
    const PALETTES = {
      blue: { name: '蓝', colors: ['#4DA3FF', '#38BDF8', '#2563EB'] },
      cyan: { name: '青', colors: ['#22D3EE', '#67E8F9', '#0891B2'] },
      violet: { name: '紫', colors: ['#A78BFA', '#C4B5FD', '#7C3AED'] },
      green: { name: '绿', colors: ['#34D399', '#6EE7B7', '#059669'] },
      amber: { name: '橙', colors: ['#FBBF24', '#FCD34D', '#D97706'] },
    }
    const FONT_STEPS = { xs: { name: '特小', scale: 0.72 }, s: { name: '小', scale: 0.84 }, m: { name: '中', scale: 1 }, l: { name: '大', scale: 1.16 } }
    const STYLE_OPTIONS = { cute: '肥鱼', minimal: '极简' }
    const DEFAULT_PREFS = { font: 'm', palette: 'blue', animate: true, showDone: true, style: 'cute' }

    function readPrefs() {
      try {
        const raw = window.localStorage.getItem(PREFS_KEY)
        if (!raw) return Object.assign({}, DEFAULT_PREFS)
        const parsed = JSON.parse(raw) || {}
        return {
          font: FONT_STEPS[parsed.font] ? parsed.font : DEFAULT_PREFS.font,
          palette: PALETTES[parsed.palette] ? parsed.palette : DEFAULT_PREFS.palette,
          animate: parsed.animate !== false,
          showDone: parsed.showDone !== false,
          style: STYLE_OPTIONS[parsed.style] ? parsed.style : DEFAULT_PREFS.style,
        }
      } catch (error) {
        return Object.assign({}, DEFAULT_PREFS)
      }
    }

    function usePrefs() {
      const state = React.useState(readPrefs)
      const prefs = state[0]
      const setPrefs = state[1]
      function update(patch) {
        setPrefs(function (prev) {
          const next = Object.assign({}, prev, patch)
          try { window.localStorage.setItem(PREFS_KEY, JSON.stringify(next)) } catch (error) { /* 忽略 */ }
          return next
        })
      }
      return [prefs, update]
    }

    function prefsStyle(prefs) {
      const colors = (PALETTES[prefs.palette] || PALETTES.blue).colors
      const scale = (FONT_STEPS[prefs.font] || FONT_STEPS.m).scale
      return {
        '--bsw-blue': colors[0],
        '--bsw-blue-2': colors[1],
        '--bsw-blue-3': colors[2],
        '--bsw-fs': String(scale),
      }
    }

    function DockView(props) {
      const data = props.data
      const openState = React.useState(false)
      const open = openState[0]
      const setOpen = openState[1]
      const prefState = usePrefs()
      const prefs = prefState[0]
      const updatePrefs = prefState[1]
      const settingsState = React.useState(false)
      const showSettings = settingsState[0]
      const setShowSettings = settingsState[1]
      const fontScale = (FONT_STEPS[prefs.font] || FONT_STEPS.m).scale
      const active = data.activeCount
      const hasActive = active > 0
      const allRows = prefs.showDone ? data.rows : data.rows.filter(function (row) { return row.running })
      const rows = allRows.slice(0, MAX_ROWS)
      const degraded = rows.length > MAX_ANIMATED
      const light = !degraded && rows.length > LIGHT_ANIMATED
      const maxTokens = rows.reduce(function (max, row) { return row.running ? Math.max(max, row.tokens) : max }, 0) || 1
      const palettes = Object.keys(PALETTES)
      const fonts = Object.keys(FONT_STEPS)
      return h('div', {
        className: 'bsw-dock' + (!prefs.animate || degraded ? ' bsw-static' : (light ? ' bsw-light' : '')),
        style: prefsStyle(prefs),
      },
        open && h('div', { className: 'bsw-pop', role: 'dialog', 'aria-label': '鱼群雷达' },
          h('div', { className: 'bsw-pop-head' },
            h('div', { className: 'bsw-pop-title' },
              prefs.style === 'cute'
                ? h('span', { className: 'bsw-fish-row' }, fishList(active, hasActive, Math.round(24 * fontScale), 4))
                : h('span', { className: 'bsw-pill-dot' + (hasActive ? ' bsw-pill-dot-live' : ' bsw-pill-dot-idle') }),
              h('span', null, '鱼群雷达')
            ),
            h('div', { className: 'bsw-pop-scan' }, h('i')),
            h('div', { className: 'bsw-pop-stat' }, active + ' 活跃 · ' + fmtTokens(data.totalTokens) + ' tok'),
            h('button', {
              type: 'button', className: 'bsw-pop-close',
              title: '设置', 'aria-label': '设置',
              onClick: function () { setShowSettings(function (value) { return !value }) },
            }, '设置'),
            h('button', {
              type: 'button', className: 'bsw-pop-close',
              title: '收起', 'aria-label': '收起',
              onClick: function () { setOpen(false) },
            }, '收起')
          ),
          showSettings && h('div', { className: 'bsw-settings' },
            h('span', { className: 'bsw-set-group' }, '主题',
              Object.keys(STYLE_OPTIONS).map(function (key) {
                return h('button', {
                  key: key, type: 'button',
                  className: 'bsw-set-btn' + (prefs.style === key ? ' bsw-set-btn-on' : ''),
                  onClick: function () { updatePrefs({ style: key }) },
                }, STYLE_OPTIONS[key])
              })
            ),
            h('span', { className: 'bsw-set-group' }, '字号',
              fonts.map(function (key) {
                return h('button', {
                  key: key, type: 'button',
                  className: 'bsw-set-btn' + (prefs.font === key ? ' bsw-set-btn-on' : ''),
                  onClick: function () { updatePrefs({ font: key }) },
                }, FONT_STEPS[key].name)
              })
            ),
            h('span', { className: 'bsw-set-group' }, '色系',
              palettes.map(function (key) {
                return h('button', {
                  key: key, type: 'button',
                  className: 'bsw-set-btn' + (prefs.palette === key ? ' bsw-set-btn-on' : ''),
                  title: PALETTES[key].name,
                  onClick: function () { updatePrefs({ palette: key }) },
                }, h('span', {
                  className: 'bsw-sw-preview',
                  style: { background: 'linear-gradient(135deg,' + PALETTES[key].colors[1] + ',' + PALETTES[key].colors[0] + ')' },
                }))
              })
            ),
            h('span', { className: 'bsw-set-group' }, '动画',
              h('button', {
                type: 'button', className: 'bsw-set-btn' + (prefs.animate ? ' bsw-set-btn-on' : ''),
                onClick: function () { updatePrefs({ animate: true }) },
              }, '开'),
              h('button', {
                type: 'button', className: 'bsw-set-btn' + (!prefs.animate ? ' bsw-set-btn-on' : ''),
                onClick: function () { updatePrefs({ animate: false }) },
              }, '关')
            ),
            h('span', { className: 'bsw-set-group' }, '完成',
              h('button', {
                type: 'button', className: 'bsw-set-btn' + (prefs.showDone ? ' bsw-set-btn-on' : ''),
                onClick: function () { updatePrefs({ showDone: true }) },
              }, '显示'),
              h('button', {
                type: 'button', className: 'bsw-set-btn' + (!prefs.showDone ? ' bsw-set-btn-on' : ''),
                onClick: function () { updatePrefs({ showDone: false }) },
              }, '隐藏')
            )
          ),
          h('div', { className: 'bsw-pop-body' },
            rows.length === 0
              ? h(EmptyState)
              : rows.map(function (row) { return h(AgentCard, { key: row.id, row: row, now: data.now, maxTokens: maxTokens, style: prefs.style }) })
          )
        ),
        h('button', {
          type: 'button', className: 'bsw-pill',
          title: hasActive ? (active + ' 个子智能体正在工作，点击查看') : '暂无活跃子智能体，点击查看',
          'aria-expanded': open ? 'true' : 'false',
          onClick: function () { setOpen(function (value) { return !value }) },
        },
          prefs.style === 'cute'
            ? h('span', { className: 'bsw-fish-row' }, fishList(active, hasActive, Math.round(20 * fontScale)))
            : h('span', { className: 'bsw-pill-dot' + (hasActive ? ' bsw-pill-dot-live' : ' bsw-pill-dot-idle') }),
          h('span', { className: 'bsw-pill-text' },
            h('span', { className: 'bsw-pill-count' + (hasActive ? '' : ' bsw-pill-count-idle') }, String(active)),
            h('span', null, ' 活跃')
          ),
          h('span', { className: 'bsw-pill-caret' }, open ? '▾' : '▴')
        )
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        serviceCtx = ctx
        ensureCss()
        try {
          ctx.slots.inject('shell.overlay', function () {
            return ctx.slots.register({
              name: 'shell.overlay',
              id: '@local/bigfish-swarm/dock',
              order: 60,
            }, SwarmDock)
          })
        } catch (error) {
          if (typeof console !== 'undefined') console.warn('[bigfish-swarm] slot register failed', error)
        }
      },
    }
  },
})
