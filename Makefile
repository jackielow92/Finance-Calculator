# Finance Calculator - Makefile
# ============================
# Run `make help` to see available commands

.PHONY: help install dev build test lint format clean preview dev-backend setup check-pnpm

# Default target
.DEFAULT_GOAL := help

# Colors for terminal output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

# Check if pnpm is installed
PNPM := $(shell command -v pnpm 2> /dev/null)

#---------------------------------------------------------------------------
# Help
#---------------------------------------------------------------------------

help: ## Show this help message
	@echo ""
	@echo "$(BLUE)Finance Calculator - Available Commands$(NC)"
	@echo "=========================================="
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)Quick Start:$(NC)"
	@echo "  1. make setup    # First-time setup"
	@echo "  2. make dev      # Start development server"
	@echo ""

#---------------------------------------------------------------------------
# Setup & Installation
#---------------------------------------------------------------------------

check-pnpm: ## Check if pnpm is installed
ifndef PNPM
	@echo "$(RED)Error: pnpm is not installed$(NC)"
	@echo "Install pnpm with: npm install -g pnpm"
	@echo "Or visit: https://pnpm.io/installation"
	@exit 1
endif
	@echo "$(GREEN)✓ pnpm is installed$(NC)"

setup: check-pnpm ## First-time project setup (install deps + prepare)
	@echo "$(BLUE)Setting up Finance Calculator...$(NC)"
	@pnpm install
	@echo ""
	@echo "$(GREEN)✓ Setup complete!$(NC)"
	@echo ""
	@echo "Run '$(YELLOW)make dev$(NC)' to start the development server"

install: check-pnpm ## Install all dependencies
	@echo "$(BLUE)Installing dependencies...$(NC)"
	@pnpm install

install-frozen: check-pnpm ## Install dependencies (frozen lockfile - for CI)
	@pnpm install --frozen-lockfile

#---------------------------------------------------------------------------
# Development
#---------------------------------------------------------------------------

dev: check-pnpm ## Start frontend development server
	@echo "$(BLUE)Starting frontend dev server...$(NC)"
	@pnpm dev

dev-backend: check-pnpm ## Start backend development server
	@echo "$(BLUE)Starting backend dev server...$(NC)"
	@pnpm dev:backend

dev-all: check-pnpm ## Start both frontend and backend (requires tmux or run in separate terminals)
	@echo "$(YELLOW)Note: Run 'make dev' and 'make dev-backend' in separate terminals$(NC)"
	@echo "Or install concurrently: pnpm add -Dw concurrently"

#---------------------------------------------------------------------------
# Build & Production
#---------------------------------------------------------------------------

build: check-pnpm ## Build frontend for production
	@echo "$(BLUE)Building frontend...$(NC)"
	@pnpm build
	@echo "$(GREEN)✓ Build complete! Output in packages/frontend/dist$(NC)"

build-all: check-pnpm ## Build all packages
	@echo "$(BLUE)Building all packages...$(NC)"
	@pnpm build:all

preview: check-pnpm ## Preview production build locally
	@echo "$(BLUE)Starting preview server...$(NC)"
	@pnpm preview

#---------------------------------------------------------------------------
# Testing & Quality
#---------------------------------------------------------------------------

test: check-pnpm ## Run all tests
	@echo "$(BLUE)Running tests...$(NC)"
	@pnpm test

test-watch: check-pnpm ## Run tests in watch mode
	@pnpm --filter frontend test:watch

test-coverage: check-pnpm ## Run tests with coverage report
	@pnpm --filter frontend test -- --coverage

lint: check-pnpm ## Run linting
	@echo "$(BLUE)Running linter...$(NC)"
	@pnpm lint

format: check-pnpm ## Format code with Prettier
	@echo "$(BLUE)Formatting code...$(NC)"
	@pnpm format

check: lint test ## Run lint and tests

#---------------------------------------------------------------------------
# Cleanup
#---------------------------------------------------------------------------

clean: ## Remove build artifacts and node_modules
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	@rm -rf packages/frontend/dist
	@rm -rf packages/backend/dist
	@rm -rf coverage
	@echo "$(GREEN)✓ Build artifacts cleaned$(NC)"

clean-all: clean ## Remove all generated files including node_modules
	@echo "$(YELLOW)Removing node_modules...$(NC)"
	@rm -rf node_modules
	@rm -rf packages/frontend/node_modules
	@rm -rf packages/backend/node_modules
	@echo "$(GREEN)✓ All generated files removed$(NC)"

#---------------------------------------------------------------------------
# Utilities
#---------------------------------------------------------------------------

outdated: check-pnpm ## Check for outdated dependencies
	@pnpm outdated

update: check-pnpm ## Update dependencies interactively
	@pnpm update -i

tree: ## Show project structure
	@echo "$(BLUE)Project Structure:$(NC)"
	@tree -I 'node_modules|dist|coverage|.git' -L 3 --dirsfirst 2>/dev/null || find . -type d \( -name node_modules -o -name dist -o -name .git \) -prune -o -type f -print | head -50
