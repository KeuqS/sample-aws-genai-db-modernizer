"""The gated test script must handle platform-only tests explicitly (#520)."""

from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
SCRIPT = REPO_ROOT / "ci" / "test.sh"
PYPROJECT = REPO_ROOT / "pyproject.toml"
READ_BOUNDS = REPO_ROOT / "tests" / "graph" / "test_read_bounds.py"


def test_linux_only_marker_is_registered():
    assert '"linux_only: tests that require Linux-specific behavior;' in PYPROJECT.read_text()


def test_non_linux_gated_runs_deselect_linux_only_tests():
    script = SCRIPT.read_text()

    assert 'if [[ "$(uname -s)" != "Linux" ]]; then' in script
    assert 'test_markers+=" and not linux_only"' in script
    assert '-m "$test_markers"' in script


def test_linux_rss_regression_stays_platform_gated():
    source = READ_BOUNDS.read_text()
    test_start = source.index("def test_raw_query_works_when_the_server_process_is_large")
    decorators = source[source.rfind("\n\n", 0, test_start) + 2 : test_start]

    assert "@pytest.mark.linux_only" in decorators
    assert "@pytest.mark.skipif(not sys.platform.startswith(\"linux\")" in decorators
